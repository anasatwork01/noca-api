import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { POST_MEDIA_TYPE, POST_STATUS } from 'src/shared/constants';

export class PostMedia {
  @ApiProperty()
  @IsString()
  url: string;

  @ApiProperty({
    default: POST_MEDIA_TYPE.IMAGE,
  })
  @IsEnum(POST_MEDIA_TYPE)
  type: POST_MEDIA_TYPE;
}

export class CreatePostDto {
  @ApiProperty()
  @ValidateIf((o) => !o.media)
  @IsString()
  content: string;

  @ApiProperty({
    type: PostMedia,
  })
  @ValidateIf((o) => !o.content)
  media: PostMedia;

  @ApiProperty()
  @IsOptional()
  @IsEnum(POST_STATUS)
  post_status = POST_STATUS.PUBLISHED;
}
