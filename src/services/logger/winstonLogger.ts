import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { randomUUID } from 'crypto';
import {
    ElasticsearchTransport,
    ElasticsearchTransportOptions,
} from 'winston-elasticsearch';
import config from '../../config/config';
import { Client } from '@elastic/elasticsearch';

const elasticTransport = (indexPrefix) => {
    const esTransportOpts: ElasticsearchTransportOptions = {
        level: 'debug',
        indexPrefix,
        //indexSuffixPattern: 'YYYY-MM-DD',
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
            node: 'http://localhost:9200',
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

// Configure Elasticsearch client
const esClient = new Client({
    node: 'http://localhost:9200',
    auth: {
        username: config().elasticsearch.user,
        password: config().elasticsearch.password,
    },
});

// Configure Elasticsearch transport
const esTransport = new ElasticsearchTransport({
    level: 'info', // Log level
    client: esClient,
    indexPrefix: 'nestjs-logs',
});

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
        new ElasticsearchTransport(
            elasticTransport(
                `mt-server-logs-${process.env.NODE_ENV || 'local'}`
            )
        ),
    ],
});
