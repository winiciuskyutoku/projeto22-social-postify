import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaModule } from '../src/prisma/prisma.module';
import { fakePost } from './factories/post.faker';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService
  let server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);

    await prisma.publication.deleteMany();
    await prisma.post.deleteMany();
    await prisma.media.deleteMany();

    await app.init();
    server = app.getHttpServer()
  });

  it('GET /health => Should return alive message', async () => {
    await request(server)
      .get('/health')
      .expect(200)
  });

  it('POST /medias => Should respond with status 409 when data combinantion alredy exists', async () => {
    await prisma.media.create({
      data: {
        title: "teste",
        username: "teste"
      }
    })

    await request(server)
      .post('/medias')
      .send({
        title: "teste",
        username: "teste"
      })
      .expect(409);
  });

  it('GET /medias => Should respond with 200', async () => {
    await request(server)
      .get('/medias')
      .expect(200)
  })

  it('GET /medias/:id => Should respond with status 404 media with given id does not exist', async () => {
    const result = await prisma.media.create({
      data: {
        title: "teste",
        username: "teste"
      }
    })

    await request(server)
      .get(`/medias/${result.id + 1}`)
      .expect(404)
  })

  it('PATCH /medias/:id => Should respond with status 409 when data combination alredy exists', async () => {
    const result = await prisma.media.create({
      data: {
        title: "teste",
        username: "teste"
      }
    })

    await request(server)
      .patch(`/medias/${result.id}`)
      .send({
        title: "teste",
        username: "teste"
      })
      .expect(409)
  })

  it('DELETE /medias/:id => Should respond with status 404 media does not exist', async () => {
    const result = await prisma.media.create({
      data: {
        title: "teste",
        username: "teste"
      }
    })

    await request(server)
      .delete(`/medias/${result.id + 1}`)
      .expect(404)
  })

  it('POST /posts => Should respond with status 400 when body data is missing', async () => {
    await request(server)
      .post('/posts')
      .send({
        title: "teste"
      })
      .expect(400)
  })

  it('GET /posts => Should respond with status 200', async () => {
    await request(server)
      .get('/posts')
      .expect(200)
  })

  it('GET /posts/:id => Should respond with status 404 when post does not exist', async () => {
    await request(server)
      .get('/posts/1')
      .expect(404)
  })

  it('PATCH /posts/:id => Should respond with status 404 when post doest not exist', async () => {
    await request(server)
      .patch('/posts/1')
      .send(fakePost())
      .expect(404)
  })

  it('DELETE /posts/:id => Should respond with status 404 when post does not eixist', async () => {
    await request(server)
      .delete('/posts/1')
      .expect(404)
  })

  it('POST /publications => Should respond with status 400 when body data is missing', async () => {
    await request(server)
      .post('/publications')
      .send({
        mediaId: 1,
        postId: 1
      })
      .expect(400)
  })

  it('GET /publications => Should respond with statuts 200', async () => {
    await request(server)
      .get('/publications')
      .expect(200)
  })

  it('GET /publications/:id => Should respond with status 404 when publication does not exist', async () => {
    await request(server)
      .get('/publications/1')
      .expect(404)
  })

  it('PATCH /publications/:id => Should respond with status 404 when publication does not exist', async () => {
    await request(server)
      .patch('/publications/1')
      .send({
        mediaId: 1,
        postId: 1,
        date: new Date()
      })
      .expect(404)
  })

  it('DELETE /publicationd/:id => Should respond with status 404 when publication doest not exist', async () => {
    await request(server)
      .delete('/pubications/1')
      .expect(404)
  })
});
