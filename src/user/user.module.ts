import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [UserController],
  providers: [UserService,ProductsService],
  exports: [UserService],
})
export class UserModule {}
