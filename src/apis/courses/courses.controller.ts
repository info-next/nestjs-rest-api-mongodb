import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { RequestType } from 'src/shared/utils/request-type';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post(RequestType.create)
  create(@Body() createCourseDto: CreateCourseDto) {
    try{
      return this.coursesService.create(createCourseDto)
    } catch(err){
      throw new NotFoundException()
    }
  }

  @Get(RequestType.getAll)
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(RequestType.getById+':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(RequestType.update+':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(RequestType.delete+':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
