import { HttpException, Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';
import { notFoundError } from '../errors/notfound.error';
import { conflictError } from '../errors/conflict.error';
import { badRequestError } from '../errors/badrequest.error';
import { forbiddenError } from '../errors/forbidden.erro';

@Injectable()
export class MediasService {
  constructor(private readonly repository: MediasRepository) { }

  async create(createMediaDto: CreateMediaDto) {
    if(!createMediaDto.title || !createMediaDto.username) return badRequestError()
    const checkMedia = await this.repository.checkMedia(createMediaDto)
    if(checkMedia)  return conflictError()

    return await this.repository.create(createMediaDto);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    const result = await this.repository.findOne(id);
    if(!result) return notFoundError()

    return result
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const checkIfExists = await this.repository.findOne(id)
    if(!checkIfExists) return notFoundError()

    const data = {
      title: updateMediaDto.title,
      username: updateMediaDto.username
    }

    const checkMedia = await this.repository.checkMedia(data)
    if(checkMedia) return conflictError()

    return await this.repository.update(id, updateMediaDto)
  }

  async remove(id: number) {
    const checkMedia = await this.repository.findOne(id)
    if(!checkMedia) return notFoundError()

    const checkPublication = await this.repository.checkPublication(id)
    if(checkPublication) return forbiddenError()

    return this.repository.remove(id)
  }
}
