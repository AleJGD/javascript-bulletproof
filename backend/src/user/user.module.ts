import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ✅ Ensure User is registered
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule], // ✅ Export TypeOrmModule to be used in tests
})
export class UserModule {}
