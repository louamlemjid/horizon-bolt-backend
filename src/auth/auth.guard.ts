import { CanActivate, ExecutionContext, Injectable,UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private supabase:SupabaseClient;
  constructor(private jwtService: JwtService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_API_KEY,
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authorization token not found');
    }

    try {
      // Verify the token with Supabase
      const { data, error } = await this.supabase.auth.getUser(token);

      if (error || !data.user) {
        throw new UnauthorizedException('Invalid token');
      }

      // Attach user data to the request object
      request['user'] = data.user;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
