import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from 'src/shared/schema/course.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
