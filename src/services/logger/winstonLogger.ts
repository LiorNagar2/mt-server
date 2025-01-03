import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { randomUUID } from 'crypto';
import {
    ElasticsearchTransport,
    ElasticsearchTransportOptions,
} from 'winston-elasticsearch';
import config from '../../config/config';

const elasticTransport = (indexPrefix) => {
    const esTransportOpts: ElasticsearchTransportOptions = {
        level: 'debug',
        indexPrefix,
        indexSuffixPattern: 'YYYY-MM-DD',
        transformer: (logData) => {
            const spanId = randomUUID();
            return {
                '@timestamp': new Date(),
                severity: logData.level,
                stack: logData.meta.stack,
                //service_name: packagejson.name,
                //service_version: packagejson.version,
                message: `${logData.message}`,
                data: JSON.stringify(logData.meta.data),
                span_id: spanId,
                utcTimestamp: logData.timestamp,
            };
        },
        clientOpts: {
            node: 'http://elasticsearch:9200',
            maxRetries: 5,
            requestTimeout: 10000,
            sniffOnStart: false,
            auth: {
                username: config().elasticsearch.user,
                password: config().elasticsearch.password,
            },
        },
    };
    return esTransportOpts;
};

export const winstonLogger = WinstonModule.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                utilities.format.nestLike()
            ),
        }),
        //new ElasticsearchTransport(elasticTransport(`mt-server`)),
    ],
});
