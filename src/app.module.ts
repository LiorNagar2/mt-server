import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantsModule } from './tenants/tenants.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './services/logger/logger.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { RequestIdMiddleware } from './middlewares/request-id.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('database.mongoUri'),
            }),
            inject: [ConfigService],
        }),
        TenantsModule,
        UsersModule,
        AuthModule,
        ProductsModule,
        LoggerModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            inject: [Logger],
            useFactory: (logger: Logger) => {
                return new LoggerInterceptor(logger);
            },
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestIdMiddleware).forRoutes('*'); // Apply to all routes
    }
}
