import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { MESSAGES } from './post.messages';
import { Post } from 'src/entities/post.entity';
import { UserRepository } from 'src/repository/user.repository';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: MongoRepository<Post>,
    private userRepository: UserRepository,
  ) {}

  async findOne(id: string): Promise<Post> {
    const post: any = await this.postRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!post) {
      throw new HttpException(MESSAGES.POST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async like(user, id: string) {
    const post = await this.postRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    let msg: string;
    if (!post) {
      throw new HttpException(MESSAGES.POST_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    if (post.likes.includes(user.id)) {
      post.likes = post.likes.filter((like) => like !== user.id);
      msg = MESSAGES.LIKE_REMOVED;
    } else {
      post.likes.push(user.id);
      msg = MESSAGES.POST_LIKED;
    }
    await this.postRepository.save(post);
    return msg;
  }

  async create(user, post: CreatePostDto) {
    let fileUrl: any;
    const userDoc = await this.userRepository.findOne({
      where: { _id: new ObjectId(user.id) },
    });
    if (!userDoc) {
      throw new HttpException(MESSAGES.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    const newPost = this.postRepository.create({
      ...post,
      likes: [],
      user_info: {
        user: userDoc._id,
        name: userDoc.name,
        avatar: userDoc.avatar,
      },
    });
    const postresponse = await this.postRepository.save(newPost);
    return MESSAGES.POST_CREATED;
  }

  async remove(user, id: string) {
    const postToRemove = await this.postRepository.findOne({
      where: { _id: new ObjectId(id), user: new ObjectId(user.id) },
    });
    if (!postToRemove) {
      throw new HttpException(MESSAGES.POST_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    await this.postRepository.remove(postToRemove);
    return MESSAGES.POST_DELETED;
  }
}
