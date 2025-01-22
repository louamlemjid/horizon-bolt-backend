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

  async signUp(email: string, password: string, username?: string) {
    // First, sign up with Supabase Auth
    const { data: authData, error: authError } = await this.supabase.auth.signUp({ email, password });

    if (authError) {
      throw new Error(`Failed to sign up: ${authError.message}`);
    }

    // Now, create a new user record in the 'users' table
    const { data: user, error: userError } = await this.supabase
      .from('users')
      .insert([
        {
          id: authData.user?.id, // Use the auth user ID
          username: null,
          joined_course: null, // Default to null
          admin: false, // Default to false
        },
      ]);

    if (userError) {
      throw new Error(`Failed to create user record: ${userError.message}`);
    }

    return {
      message: 'User successfully signed up and created!',
      user: user ? user[0] : null, // Return the user data
    };
  }
  //add username
  async addUserName(userId: string,userName: string) {
    // Ensure you're using Supabase admin privileges if needed
    const { error } = await this.supabase
    .from('users')
    .update(
    {
      username: userName,
    })
    .eq('id', userId)
    .select()
  
    if (error) {
      throw new Error(error.message);
    }
  
    return { message: 'Username added successfully' };
  }
  async changePassword(userId: string, newPassword: string) {
    // Ensure you're using Supabase admin privileges if needed
    const { error } = await this.supabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    });
  
    if (error) {
      throw new Error(error.message);
    }
  
    return { message: 'Password updated successfully' };
  }
  
}
