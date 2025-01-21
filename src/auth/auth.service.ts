import { Injectable,UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
@Injectable()
export class AuthService {
  private supabase: SupabaseClient;
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {this.supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY,
  );}

  //login
  // async signIn(
  //   createAuthDto: CreateAuthDto,
  // ): Promise<{ access_token: string }> {
  //   const user = await this.userService.findOne(createAuthDto.email);
  //   console.log(user);
  //   if (user?.password !== createAuthDto.password) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { sub: user.userId, userName: user.userName };
  //   return {
  //     access_token: await this.jwtService.signAsync(payload),
  //   };
  // }
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return data;
  }
  //register
  // async signUp(createUserDto: CreateUserDto) {
  //   const user = await this.userService.create(createUserDto);
  //   return { message: 'User registered successfully', user };
  // }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    return data;
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
