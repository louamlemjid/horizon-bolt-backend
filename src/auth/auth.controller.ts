import { Controller, Get, Post, Body, Patch,Put, Param, Delete,UseGuards,HttpCode,HttpStatus,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signIn(email, password);
  }
  
  @Post('register')
  signUp(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.signUp(email, password);
  }

  @UseGuards(AuthGuard)
  @Patch('add-username')
  getProfile(@Request() req:any,@Body() userName: string) {
    return this.authService.addUserName(req.user.id,userName);
  }

  @Put('change-password')
  @UseGuards(AuthGuard) // Ensure user is authenticated
  async changePassword(
    @Request() req: any, // Extract the user object from the request
    @Body('newPassword') newPassword: string
  ) {
    const userId = req.user.id; // Assuming the AuthGuard sets req.user
    return this.authService.changePassword(userId, newPassword);
  }

}
