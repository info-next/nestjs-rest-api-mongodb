import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestType } from 'src/shared/utils/request-type';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post(RequestType.register)
    register(@Body() createUserDto: CreateUserDto) {
     try{
       return this.authService.registerUser(createUserDto)
     } catch(err){
       throw new NotFoundException()
     }
   }

   @Post(RequestType.login)
   login(@Body() createUserDto: CreateUserDto) {
    try{
      return this.authService.loginUser(createUserDto.email, createUserDto.password)
    } catch(err){
      throw new NotFoundException()
    }
  }


}
