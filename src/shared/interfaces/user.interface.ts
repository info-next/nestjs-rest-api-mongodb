import { Document } from 'mongoose';
import { Role } from '../schema/role.schema';
export interface IUser extends Document{
    readonly name: string;
    readonly email: string;
    readonly phone: number;
    readonly password: string;
    readonly role?: Partial<Role>;
}