import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './apis/users/users.module';
import { CoursesModule } from './apis/courses/courses.module';
import { AuthModule } from './apis/auth/auth.module';
import { CategoryModule } from './apis/category/category.module';
import { RoleModule } from './apis/role/role.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'e-learning'}),
    AuthModule,UsersModule,CoursesModule, CategoryModule,RoleModule
  ]
})
export class AppModule {}
