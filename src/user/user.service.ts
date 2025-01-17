import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export type User = any;

@Injectable()

export class UserService {
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

  async findOne(userName: string): Promise<User | undefined> {
    return this.users.find(user => user.userName === userName);
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${email} user`;
  }

  remove(email: string) {
    return `This action removes a #${email} user`;
  }
  addProduct()
  {
    return 'Product added successfully';
  }
  updateProduct()
  {
    return 'Product updated successfully';
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
