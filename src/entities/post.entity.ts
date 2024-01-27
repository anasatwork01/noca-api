import { ObjectId } from 'mongodb';
import {
  POST_MEDIA_TYPE,
  POST_STATUS,
  ROLE,
  STATUS,
} from 'src/shared/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

class UserInfo {
  @Column()
  user: ObjectId;

  @Column()
  name: string;

  @Column()
  avatar: string;
}

export class Media {
  @Column()
  url: string;

  @Column({ enum: POST_MEDIA_TYPE, default: POST_MEDIA_TYPE.IMAGE })
  type: POST_MEDIA_TYPE;
}

@Entity()
export class Post {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({
    enum: POST_STATUS,
    default: POST_STATUS.PUBLISHED,
  })
  post_status: POST_STATUS;

  @Column()
  content: string;

  @Column()
  media: Media;

  @Column()
  user_info: UserInfo;

  @Column()
  likes: ObjectId[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
