import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'e-learning'}),
  ]
})
export class AppModule {}
