import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ICourse } from 'src/shared/interfaces/course.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CoursesService {

  constructor(@InjectModel('Course') private courseModel:Model<ICourse>) {}
  create(createCourseDto: CreateCourseDto) : Promise<ICourse> {
    const newCourse = new this.courseModel(createCourseDto);
    return newCourse.save();
  }

  async findAll(): Promise<ICourse[]> {
    const coursesData = await this.courseModel.find();
    if (!coursesData || coursesData.length == 0) {
      throw new NotFoundException('Course data not found! collection is empty');
    }
    return coursesData;
  }

  findOne(id: string): Promise<ICourse> {
    const courseData = this.courseModel.findById(id);
    if (!courseData) {
      throw new NotFoundException('Course data not found!');
    }
    return courseData;
    }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<ICourse> {
    const existingCourse = await  this.courseModel.findByIdAndUpdate(id, updateCourseDto, { new: true });
    if (!existingCourse) {
      throw new NotFoundException(`Course #${id} not found`);
     }
     return existingCourse;
  }

  async remove(id: string):Promise<string> {
    const deletedCourse = await this.courseModel.findByIdAndDelete(id);
   if (!deletedCourse) {
     throw new NotFoundException(`Course #${id} not found`);
   }
   return `Course #${id} deleted`;
  }
}
