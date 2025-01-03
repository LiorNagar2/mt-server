import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TenantsService } from '../tenants/tenants.service';
import { SignInResponse } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
        private tenantService: TenantsService
    ) {}

    async validateUser(username: string, pass: string) {
        const user = await this.usersService.findOne(username);
        if (user && this.usersService.verifyPass(pass, user.password)) {
            return user;
        }
        return null;
    }

    async signIn(username: string, pass: string): Promise<SignInResponse> {
        const user = await this.validateUser(username, pass);
        if (!user) {
            throw new UnauthorizedException();
        }

        const tenantSecret = await this.tenantService.getTenantSecret(
            user.tenantId
        );

        const payload = { sub: user._id, tenantId: user.tenantId };
        const access_token = await this.jwtService.signAsync(payload, {
            secret: tenantSecret,
        });
        return {
            access_token,
        };
    }

    async verifyTenantJwt(token: string, tenantId: string) {
        const tenantSecret = await this.tenantService.getTenantSecret(tenantId);
        const payload = await this.jwtService.verifyAsync(token, {
            secret: tenantSecret,
        });
        return payload;
    }
}
