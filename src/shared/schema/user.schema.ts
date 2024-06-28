import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes } from "mongoose";
@Schema({ timestamps: true })
export class User {
   @Prop({ required: true })
   name: string;
   @Prop({ required: true,unique: true })
   email: string;
   @Prop({ required: true })
   phone: number;
   @Prop({ required: true })
   password: string;
   @Prop({ type: SchemaTypes.ObjectId, ref: 'Role', required: true })
   role: string;
}
export const UserSchema = SchemaFactory.createForClass(User);