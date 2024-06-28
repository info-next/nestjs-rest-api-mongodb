import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/shared/interfaces/user.interface';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel:Model<IUser>) { }
   async create(createUserDto: CreateUserDto) : Promise<IUser> {
    const hash = await bcrypt.hash(createUserDto.password, 10);
      const newUser = new this.userModel({...createUserDto , password: hash });
      return newUser.save();
   }

   async findAll():Promise<IUser[]> {
    const usersData = await this.userModel.find().select('-password').populate('role');
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await  this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string):Promise<string> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
   if (!deletedUser) {
     throw new NotFoundException(`User #${id} not found`);
   }
   return `User #${id} deleted`;
  }
}
