import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { ContactInfo } from './contact-info.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Module({
  // imports: [UsersModule, TodosModule],
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // ? database type
      // database: 'db.sqlite', // database name
      database: '../db', // database name
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: true,
      // username : 'username', // ? if mysql need
      // password : 'password' // ? if mysql need
    }),
    TypeOrmModule.forFeature([Employee, ContactInfo, Meeting, Task]),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
