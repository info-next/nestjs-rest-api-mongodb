import { IsEmail, IsNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsNumber()
    phone: number;

    @IsStrongPassword()
    password: string;

    @IsString()
    role: string;
}
