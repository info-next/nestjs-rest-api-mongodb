import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateCourseDto {
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  
    @IsNumber()
    price: number;
  
    @IsString()
    instructor: string;
  
    @IsOptional()
    @IsString()
    courseImage?: string;

    @IsString()
    category: string;
}
