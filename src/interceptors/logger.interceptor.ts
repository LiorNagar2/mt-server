import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
    LoggerService,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { anonymize } from '../helpers/anonynimize.helper';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const startTime = Date.now();

        const ctx = context.switchToHttp();
        const request: Request = ctx.getRequest();
        const { ip, url, method } = request;

        const requestId = request['requestId'];
        this.logger.log(
            `Request - ${method} - requestId: ${requestId} - ${url} - ${ip} ` +
                JSON.stringify(anonymize(request.body )),
            LoggerInterceptor.name
        );

        return next.handle().pipe(
            tap(() => {
                const response: Response = ctx.getResponse();
                const time = Date.now() - startTime;
                return this.logger.log(
                    `Response - ${method} - requestId: ${requestId} - ${url} - ${ip} ` +
                        `status: ${response.statusCode} `, // `time: ${time}ms`
                    LoggerInterceptor.name
                );
            })
        );
    }
}
