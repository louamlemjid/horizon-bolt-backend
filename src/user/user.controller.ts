import { Controller, Get, Post, Body, Patch, Param, Delete,
  UseGuards,HttpCode,HttpStatus,Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { AuthGuard } from '../auth/auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard)
  @Post()
  createProduct(@Request() req,@Body() createProductDto: CreateProductDto) {
    return this.userService.createProduct(req,createProductDto);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') userName: string) {
    return this.userService.findOne(userName);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}
