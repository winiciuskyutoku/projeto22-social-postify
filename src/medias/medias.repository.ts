import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediasRepository {

    constructor(private readonly prisma: PrismaService) { }

    checkPublication(id: number){
        return this.prisma.publication.findFirst({
            where: {
                mediaId: id
            }
        })
    }

    checkMedia(createMediaDto: CreateMediaDto){
        return this.prisma.media.findFirst({
            where: {
                title: createMediaDto.title,
                username: createMediaDto.username
            }
        })
    }

    create(createMediaDto: CreateMediaDto) {
        return this.prisma.media.create({data: createMediaDto});
    }

    findAll() {
        return this.prisma.media.findMany({});
    }

    findOne(id: number) {
        return this.prisma.media.findFirst({
            where: {
                id
            }
        })
    }

    update(id: number, updateMediaDto: UpdateMediaDto) {
        return this.prisma.media.update({
            where: {
                id
            },
            data:updateMediaDto
        });
    }

    remove(id: number) {
        return this.prisma.media.delete({
            where: {
                id
            }
        })
    }
}
