import { IsString } from 'class-validator';

export class SignInDto {
    @IsString()
    username: string;
    @IsString()
    password: string;
}

export class SignInResponse {
    access_token: string;
}
