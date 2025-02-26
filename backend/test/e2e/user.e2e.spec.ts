/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../../src/user/user.module';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/user/user.entity';
import { Repository } from 'typeorm';
import * as request from 'supertest';

describe('User E2E - API Tests', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '', 10) || 5432,
          username: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASS || 'password',
          database: process.env.DB_NAME || 'javascript_bulletproof',
          entities: [User],
          synchronize: true,
        }),
        UserModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );
  });

  afterAll(async () => {
    await userRepository.clear();
    await app.close();
  });

  it('should create a new user via API', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({ name: 'E2E Test User' });

    const createdUser = response.body as User;

    expect(response.status).toBe(201);
    expect(createdUser).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'E2E Test User',
      }),
    );
  });

  it('should get a user by ID via API', async () => {
    const createdUser = await userRepository.save({ name: 'E2E Test User' });

    const response = await request(app.getHttpServer()).get(
      `/user/${createdUser.id}`,
    );

    const foundUser = response.body as User;

    expect(response.status).toBe(200);
    expect(foundUser).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: 'E2E Test User',
      }),
    );
  });
});
