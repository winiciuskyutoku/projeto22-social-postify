import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { badRequestError } from '../errors/badrequest.error';
import { notFoundError } from '../errors/notfound.error';
import { forbiddenError } from '../errors/forbidden.erro';

@Injectable()
export class PublicationsService {
  constructor(private readonly repository: PublicationsRepository){}

  async create(createPublicationDto: CreatePublicationDto) {
    if(!createPublicationDto.mediaId || !createPublicationDto.date || !createPublicationDto.postId) return badRequestError()

    const checkPost = await this.repository.getPost(createPublicationDto.postId)
    const checkMedia = await this.repository.getPost(createPublicationDto.mediaId)
    if(!checkPost || !checkMedia ) return notFoundError()


    return await this.repository.create(createPublicationDto)
  }

  async findAll() {
    return await this.repository.findAll()
  }

  async findOne(id: number) {
    const result =  await this.repository.findOne(id)
    if(!result) return notFoundError()

    return notFoundError()
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const checkPublication = await this.repository.findOne(id)
    if(!checkPublication) return notFoundError()
    if(checkPublication.date < new Date()) return forbiddenError()

    const checkPost = await this.repository.getPost(updatePublicationDto.postId)
    const checkMedia = await this.repository.getPost(updatePublicationDto.mediaId)
    if(!checkPost || !checkMedia ) return notFoundError()

    return await this.repository.update(id, updatePublicationDto)
  }

  async remove(id: number) {
    const checkPublication = await this.repository.findOne(id)
    if(!checkPublication) return notFoundError()

    return await this.repository.remove(id)
  }
}
