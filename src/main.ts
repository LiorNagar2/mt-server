import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';
import { createSwagger, printSwaggerDetails } from './helpers/swaggerHelper';
import { ValidationPipe } from '@nestjs/common';
import { winstonLogger } from './services/logger/winstonLogger';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
    const logger = winstonLogger;
    const app = await NestFactory.create(AppModule, {
        logger: logger,
    });

    app.useGlobalPipes(new ValidationPipe());
    //app.useGlobalInterceptors(new LoggingInterceptor(logger));
    app.useGlobalFilters(new HttpExceptionFilter());

    createSwagger(app);
    printSwaggerDetails();

    await app.listen(config().port).then(() => {
        logger.log(`Application is running on port: ${config().port}`);
    });
}
bootstrap();
