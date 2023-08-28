import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { MediasModule } from './medias/medias.module';
import { PublicationsController } from './publications/publications.controller';
import { PublicationsModule } from './publications/publications.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsController } from './posts/posts.controller';
import { MediasController } from './medias/medias.controller';

@Module({
  imports: [PostsModule, MediasModule, PublicationsModule, PrismaModule],
  controllers: [AppController, PublicationsController, PostsController, MediasController],
  providers: [AppService],
})
export class AppModule {}
