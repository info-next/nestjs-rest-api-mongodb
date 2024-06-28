import { Document } from "mongoose";

export interface IRole extends Document {
    readonly role: string;
  }