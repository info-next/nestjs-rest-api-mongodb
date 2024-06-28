import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ICourse } from '../interfaces/course.interface';

@Schema({ timestamps: true })
export class Course extends Document implements ICourse {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  instructor: string;

  @Prop()
  courseImage: string;

  @Prop({type: SchemaTypes.ObjectId, ref: 'Category', required: true})
  category: string
}

export const CourseSchema = SchemaFactory.createForClass(Course);