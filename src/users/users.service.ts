import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel:Model<IUser>) { }
  async create(createUserDto: CreateUserDto) : Promise<IUser> {
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
   }

   async findAll():Promise<IUser[]> {
    const usersData = await this.userModel.find();
    if (!usersData || usersData.length == 0) {
        throw new NotFoundException('User data not found! collection is empty');
    }
    return usersData;
  }

 async findOne(id: string) {
  const userData = await this.userModel.findById(id);
  if (!userData) {
    throw new Error('User not Found!');
}
return userData;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
