import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';

export type UserDocument = User & Document;

@Schema()
export class User implements UserDto {
    @Prop({
        required: false,
        default: Types.ObjectId,
        type: SchemaTypes.ObjectId,
    })
    _id: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    tenantId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
