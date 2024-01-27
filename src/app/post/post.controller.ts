import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../authentication/guard/roles.guard';
import { VerifiedGuard } from '../authentication/guard/verified.guard';

@ApiTags('Posts Endpoints')
@Controller('post')
@ApiBearerAuth('JWT-auth')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //   @Get('user/:id')
  //   getUserPosts(@Param('id') id: string, @Query() query: PostListingDto) {
  //     return this.postService.findAll(id, query, VIEW_PROFILE_TYPE.OTHER);
  //   }

  //   @Get()
  //   findAll(@Req() req, @Query() query: PostListingDto) {
  //     return this.postService.findAll(
  //       req.user.id,
  //       query,
  //       VIEW_PROFILE_TYPE.OWNER,
  //     );
  //   }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Post()
  create(@Req() req, @Body() createPostDto: CreatePostDto) {
    return this.postService.create(req.user, createPostDto);
  }

  @Put(':id/like')
  like(@Req() req, @Param('id') id: string) {
    return this.postService.like(req.user, id);
  }

  @UseGuards(RolesGuard)
  @UseGuards(VerifiedGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.postService.remove(req.user, id);
  }
}
