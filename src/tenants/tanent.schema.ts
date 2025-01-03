import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TenantDocument = Tenant & Document;

@Schema()
export class Tenant {
    @Prop({ unique: true })
    readonly tenantId: string;

    @Prop()
    companyName: string;

    @Prop()
    jwtSecret: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
