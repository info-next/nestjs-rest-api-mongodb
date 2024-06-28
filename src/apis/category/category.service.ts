import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from 'src/shared/interfaces/category.interface';

@Injectable()
export class CategoryService {

  constructor(@InjectModel('Category') private categoryModel:Model<ICategory>) { }

  create(createCategoryDto: CreateCategoryDto) {
    const newData = new this.categoryModel(createCategoryDto);
      return newData.save();
  }
  async findAll():Promise<ICategory[]> {
    const allData = await this.categoryModel.find();
    if (!allData || allData.length == 0) {
        throw new NotFoundException('ategory data not found! collection is empty');
    }
    return allData;
  }

 async findOne(id: string) {
  const data = await this.categoryModel.findById(id);
  if (!data) {
    throw new Error('Category not Found!');
}
return data;
  }

  async update(id: string, UpdateCategoryDto: UpdateCategoryDto): Promise<ICategory> {
    const data = await  this.categoryModel.findByIdAndUpdate(id, UpdateCategoryDto, { new: true });
    if (!data) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return data;
  }

  async remove(id: string):Promise<string> {
    const data = await this.categoryModel.findByIdAndDelete(id);
   if (!data) {
     throw new NotFoundException(`Category #${id} not found`);
   }
   return `Category #${id} deleted`;
  }
}