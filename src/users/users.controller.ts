import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user-dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'name', required: false }) // ? 'name' so tk character ko phan pe name so tk key nk pyn shar ml
  @Get()
  getUsers(@Query('name') name: string) {
    return this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User, description: 'User Description something!' })
  // @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  // @ApiInternalServerErrorResponse()
  @Get(':id')
  getUserById(@Param('id',ParseIntPipe) id: number) {
    // console.log('===> ',typeof id);

    const user = this.usersService.findOne(id);

    // if(!user) throw new BadRequestException(); // ! 400 Bad Request
    if(!user) throw new NotFoundException(); // ! 404 Not Found
    // if(!user) throw new InternalServerErrorException(); // ! 500 Internal Server Error
    
    
    return user
  }


  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse()
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }


  @Patch(':id')
  update(@Param('id') id:string,@Body() updateUserDto: UpdateUserDto){
    return this.usersService.update(+id,updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id :string){
    return this.usersService.remove(+id);
  }
}
