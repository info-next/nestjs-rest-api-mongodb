import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestType } from 'src/shared/utils/request-type';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(RequestType.create)
   create(@Body() createUserDto: CreateUserDto) {
    try{
      return this.usersService.create(createUserDto)
    } catch(err){
      throw new NotFoundException()
    }
  }

  
  @Get(RequestType.getAll)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(RequestType.getById+':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(RequestType.update+':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(RequestType.delete+':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
