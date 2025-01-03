import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    username: string;

    @ApiProperty({ format: 'email' })
    @IsEmail()
    email: string;

    @ApiProperty({ format: 'password' })
    @IsStrongPassword()
    password: string;

    @IsString()
    tenantId?: string;
}
