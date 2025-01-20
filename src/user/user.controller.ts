import { Controller, Get, Post, Body,Put, Patch, Param, Delete,
  UseGuards,HttpCode,HttpStatus,Request,Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Product } from 'src/products/entities/product.entity';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Post()
  createProduct(@Request() req,@Body() createProductDto: CreateProductDto) {
    return this.userService.createProduct(req,createProductDto);
  }
  @UseGuards(AuthGuard)
  @Put('updateProduct/:productId')
  updateProduct(@Request() req:any,@Param('productId') productId:number ,@Query() updateProductDto: UpdateProductDto) {
    return this.userService.updateProduct(productId,req,updateProductDto);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  
}
