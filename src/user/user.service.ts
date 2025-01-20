import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ProductsService } from 'src/products/products.service';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
export type User = any;

@Injectable()

export class UserService {
  constructor (private productsService: ProductsService) {}
  private readonly users = [
    {
      userName: "jay2",
      email: 'john@gmail.com',
      password: 'changeme',
    },
    {
      userName: "MARIA1",
      email: 'maria@gmail.com',
      password: 'guess',
    },
    {
      userName: "louam3",
      email: 'louam@gmail.com',
      password: '123',
    },
  ];
  async createProduct(req:any,createProductDto: CreateProductDto ) {
    console.log("from service user: ",req.user);
    createProductDto.userNameOwner = req.user.userName;
    return this.productsService.create(createProductDto);
  }
  async updateProduct(productId:number,req:any,updateProductDto:UpdateProductDto) {
    console.log("from service user: ",req.user,updateProductDto);
    return this.productsService.update(productId,req,updateProductDto);
  }
  async create(createUserDto: CreateUserDto): Promise <Object> {

   this.users.push(createUserDto);
   return { createUserDto };
  }

  findAll() {
    return this.users.map(user => {
      const { password, ...result } = user;
      return result;
    })
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${email} user`;
  }

  remove(email: string) {
    return `This action removes a #${email} user`;
  }
  
  deleteProduct()
  {
    return 'Product deleted successfully';
  }
  getProductsByUser()
  {
    return 'Products for retrieved successfully';
  }
  joinCourse()
  {
    return 'Course joined successfully';
  }
  buyProduct()
  {
    return 'Product bought successfully';
  }
}
