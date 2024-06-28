import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRole } from 'src/shared/interfaces/role.interface';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel:Model<IRole>) { }

 async create(CreateRoleDto: CreateRoleDto) {
    const data = await this.roleModel.findById(CreateRoleDto.name);
    if (data) {
      throw new BadRequestException('Role already exists!');
    }else{
      const newData = new this.roleModel(CreateRoleDto);
      return newData.save();
    }
  }
  async findAll():Promise<IRole[]> {
    const allData = await this.roleModel.find();
    if (!allData || allData.length == 0) {
        throw new NotFoundException('Role data not found! collection is empty');
    }
    return allData;
  }

 async findOne(id: string) {
  const data = await this.roleModel.findById(id);
  if (!data) {
    throw new Error('Role not Found!');
}
return data;
  }

  async update(id: string, UpdateRoleDto: UpdateRoleDto): Promise<IRole> {
    const data = await  this.roleModel.findByIdAndUpdate(id, UpdateRoleDto, { new: true });
    if (!data) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return data;
  }

  async remove(id: string):Promise<string> {
    const data = await this.roleModel.findByIdAndDelete(id);
   if (!data) {
     throw new NotFoundException(`Role #${id} not found`);
   }
   return `Role #${id} deleted`;
  }
}