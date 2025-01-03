import { REQUEST } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Request } from 'express';
import { InternalServerErrorException } from '@nestjs/common';

export const TenantConnectionProvider = {
    provide: 'TENANT_CONNECTION',
    useFactory: (req: Request, connection: Connection) => {
        const { tenantId } = req;
        if (!tenantId) {
            throw new InternalServerErrorException(
                'TenantsMiddleware need to be applied'
            );
        }
        return connection.useDb(`tenant_${tenantId}`);
    },
    inject: [REQUEST, getConnectionToken()],
};
