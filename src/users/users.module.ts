import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([User])],// ! database nk chate htr tl so yim dr lo tl
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
