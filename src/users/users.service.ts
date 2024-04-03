import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  // private users: User[] = [
  //   { id: 0, name: 'Aung' },
  //   { id: 1, name: 'Myat' },
  //   { id: 2, name: 'Moe' }
  // ]; // TODO: d mr ka database nk chate mr

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  findAll(name?: string){
    // return this.usersRepository.find(); // ! SELECT * FROM user (NO SEARCH)
    // return this.usersRepository.createQueryBuilder('users').select().where().andWhere().orderBy().groupBy();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // return this.usersRepository.update(id, updateUserDto);
    const user = await this.findOne(id);

    return this.usersRepository.save({...user,...updateUserDto})
  }

  async remove(id : number){
    // return this.usersRepository.delete(id);
    const user = await this.findOne(id);

    return this.usersRepository.remove(user);
  }
}
