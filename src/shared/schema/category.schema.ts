import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Category {
    @Prop({ required: true, unique: true })
    name: string;
    @Prop({ required: true })
    description: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category)