import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        req.requestId = randomUUID();
        res.setHeader('X-Request-Id', req.requestId); // Add to response headers
        next();
    }
}
