import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DesignerModule } from './designer/designer.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { CourseModule } from './course/course.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, DesignerModule, UserModule, AdminModule, CourseModule, PaymentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
