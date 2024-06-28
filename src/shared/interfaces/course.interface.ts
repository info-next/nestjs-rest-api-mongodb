import { Document } from 'mongoose';

export interface ICourse extends Document{
    title: string;
    description: string;
    price: number;
    instructor: string;
    courseImage?: string;  // Optional field
  }