declare namespace Express {
    export interface Request {
        tenantId?: string;
        requestId?: string;
    }
}