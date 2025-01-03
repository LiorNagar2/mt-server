import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { winstonLogger } from '../services/logger/winstonLogger';
import { anonymize } from '../helpers/anonynimize.helper';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = winstonLogger;

    catch(exception: Error, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        const statusCode =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            exception instanceof HttpException
                ? exception['response']['message']
                    ? exception['response']['message']
                    : exception.message
                : 'Internal server error';

        const logError: any = {
            statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            errorName: exception?.name,
            message: exception?.message,
        };

        const errorResponse: any = {
            statusCode,
            message,
        };
        this.logger.error(
            logError,
            anonymize(request.body),
            HttpExceptionFilter.name
        );
        if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
            console.log('Send email to server administrator...');
        }
        response.status(statusCode).json(errorResponse);
    }
}
