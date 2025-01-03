import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            createUserDto.password = this.hashPass(createUserDto.password);
            // TODO:: check if tenant id exists and return error if not
            const user = await new this.userModel(createUserDto);
            return await user.save();
        } catch (err) {
            if (err.code === 11000) {
                const { username, tenantId } = createUserDto;
                err.error = 'TenantUserExists';
                err.message = `User '${username}' already exists in tenant '${tenantId}`;
            }
            console.log(err);
            throw new BadRequestException(err.message, err.error);
        }
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(username: string) {
        return this.userModel.findOne({ username });
    }

    findById(_id: number) {
        return this.userModel.findOne({ _id });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    hashPass(password: string) {
        return bcrypt.hashSync(password, 10);
    }

    verifyPass(password: string, passwordHash: string) {
        return bcrypt.compareSync(password, passwordHash);
    }
}
