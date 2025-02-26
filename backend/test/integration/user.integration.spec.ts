import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/user/user.entity';
import { UserService } from '../../src/user/user.service';
import { Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

describe('UserService - Integration Tests', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '', 10) || 5432,
          username: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASS || 'password',
          database: process.env.DB_NAME || 'javascript_bulletproof_test',
          entities: [User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await userRepository.clear();
    await module.close();
  });

  it('should create and retrieve a user from the database', async () => {
    const newUser = await userService.createUser('Test User');
    expect(newUser.id).toBeDefined();

    const userFromDB = await userRepository.findOne({
      where: { id: newUser.id },
    });
    expect(userFromDB).toBeDefined();
    expect(userFromDB?.name).toBe('Test User');
  });

  it('should delete a user from the database', async () => {
    const newUser = await userService.createUser('To Delete');
    await userRepository.delete(newUser.id);

    const userFromDB = await userRepository.findOne({
      where: { id: newUser.id },
    });
    expect(userFromDB).toBeNull();
  });
});
