import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/shared/interfaces/user.interface';
import { CreateUserDto } from 'src/apis/users/dto/create-user.dto';

@Injectable()
export class AuthService {
constructor( 
    @InjectModel('User') private userModel: Model<IUser>,
    private jwtService: JwtService,) {}


    async registerUser(createUserDto: CreateUserDto): Promise<IUser> {
        try {
          const hash = await bcrypt.hash(createUserDto.password, 10);
           const newUser  = await this.userModel.create({ ...createUserDto, password: hash });
          return newUser;
        } catch (error) {
          throw new Error('An error occurred while registering the user');
        }
     }

     /**
     * Logs in a user and returns a JWT token
     * @param email the email of the user
     * @param password the password of the user
     * @returns a user object with a JWT token
     */
     async loginUser(email: string, password: string):  Promise<any> {
        try {
          // find the user in the database
          const user = await this.userModel.findOne({ email }).populate('role');
          // if no user found, throw a NotFoundException
          if (!user) {
            throw new NotFoundException('User not found');
          }

          // compare the provided password with the stored password
          const passwordMatch = await bcrypt.compare(password, user.password);
          // if the passwords do not match, throw an UnauthorizedException
          if (!passwordMatch) {
            throw new UnauthorizedException('Invalid login credentials');
          }

          // create a payload with the user's ID
          const payload = { userId: user._id };
          // sign the payload with the JWT secret
          const token = this.jwtService.sign(payload);

          // return the user with the JWT token
          return { ...user.toObject(), token,role: user.role };
        } catch (error) {
          console.log(error);
          // if an error occurred, throw an UnauthorizedException
          throw new UnauthorizedException('An error occurred while logging in');
        }
      }
    

}
