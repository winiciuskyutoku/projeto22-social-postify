import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { badRequestError } from '../errors/badrequest.error';
import { notFoundError } from '../errors/notfound.error';
import { forbiddenError } from '../errors/forbidden.erro';

@Injectable()
export class PostsService {
  constructor(private readonly repository: PostsRepository){}

  async create(createPostDto: CreatePostDto) {
    if(!createPostDto.text || !createPostDto.title) return badRequestError()

    return await this.repository.create(createPostDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findOne(id: number) {
    const result = await this.repository.findOne(id)
    if(!result) return notFoundError()

    return result
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const result = await this.repository.findOne(id)
    if(!result) return notFoundError()

    return await this.repository.update(id, updatePostDto)
  }

  async remove(id: number) {
    const result = await this.repository.findOne(id)
    if(!result) return notFoundError()

    const checkPublication = await this.repository.checkPublication(id)
    if(checkPublication) return forbiddenError()

    return await this.repository.remove(id)
  }
}
