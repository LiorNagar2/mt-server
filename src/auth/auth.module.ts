import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TenantsModule } from '../tenants/tenants.module';

@Module({
    imports: [
        UsersModule,
        TenantsModule,
        JwtModule.register({
            global: true,
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
