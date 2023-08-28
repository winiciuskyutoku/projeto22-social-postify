import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsRepository {
    constructor(private readonly prisma: PrismaService) { }

    checkPublication(id: number){
        return this.prisma.publication.findFirst({
            where: {
                postId: id
            }
        })
    }

    create(createPostDto: CreatePostDto) {
        return this.prisma.post.create({data: createPostDto})
    }

    findAll() {
        return this.prisma.post.findMany({})
    }

    findOne(id: number) {
        return this.prisma.post.findFirst({where: {id}})
    }

    update(id: number, updatePostDto: UpdatePostDto) {
        return this.prisma.post.update({
            where: {
                id
            },
            data: updatePostDto
        })
    }

    remove(id: number) {
        return this.prisma.post.delete({
            where: {
                id
            }
        })
    }
}
