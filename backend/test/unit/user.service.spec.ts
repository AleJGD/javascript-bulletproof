/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/user/user.service';
import { User } from '../../src/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('UserService - Unit Tests', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should create a user and call create() and save()', async () => {
    const userName = 'Test User';

    const createSpy = jest.spyOn(userRepository, 'create');
    const saveSpy = jest.spyOn(userRepository, 'save');

    await userService.createUser(userName);

    expect(createSpy).toHaveBeenCalledWith({ name: userName });
    expect(saveSpy).toHaveBeenCalled();
  });

  it('should retrieve a user by ID and call findOneBy()', async () => {
    const userId = 1;

    const findSpy = jest.spyOn(userRepository, 'findOneBy');

    await userService.getUser(userId);

    expect(findSpy).toHaveBeenCalledWith({ id: userId });
  });

  it('should delete a user when it exists', async () => {
    const userId = 1;

    const findSpy = jest
      .spyOn(userRepository, 'findOneBy')
      .mockResolvedValue({ id: userId, name: 'Test User' } as User);
    const deleteSpy = jest
      .spyOn(userRepository, 'delete')
      .mockResolvedValue({ affected: 1 } as any);

    await userService.deleteUser(userId);

    expect(findSpy).toHaveBeenCalledWith({ id: userId });
    expect(deleteSpy).toHaveBeenCalledWith(userId);
  });

  it('should throw NotFoundException when deleting a non-existing user', async () => {
    const userId = 999;

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(null);

    await expect(userService.deleteUser(userId)).rejects.toThrow(
      NotFoundException,
    );
  });
});
