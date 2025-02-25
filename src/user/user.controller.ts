import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body('name') name: string) {
    return this.userService.createUser(name);
  }

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUser(Number(id));
  }
}
