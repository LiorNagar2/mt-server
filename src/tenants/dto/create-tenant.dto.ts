import { IsString, Length, Matches } from 'class-validator';
import { UserDto } from '../../users/dto/user.dto';

export class CreateTenantDto {
    @Length(2, 12, {
        message: 'tenantId must be between 2 and 8 characters long',
    })
    @Matches(/^[A-Z0-9]+$/, {
        message: 'tenantId must contain only uppercase alphanumeric characters',
    })
    tenantId: string;

    @IsString()
    companyName: string;

    user: UserDto;
}
