import {
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignInResponse } from './dto/sign-in.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiResponse({
        status: 200,
        type: SignInResponse,
    })
    @Post('login')
    async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
        try {
            return await this.authService.signIn(
                signInDto.username,
                signInDto.password
            );
        } catch (e) {
            throw new HttpException(e, HttpStatus.UNAUTHORIZED);
        }
    }
}
