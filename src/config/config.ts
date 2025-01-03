export default () => ({
    port: parseInt(process.env.PORT, 10) || 4000,
    database: {
        mongoUri: process.env.MONGO_URL,
    },
    security: {
        encryptionKey: process.env.ENCRYPTION_KEY,
    },
    elasticsearch: {
        user: process.env.ELASTIC_USER || '',
        password: process.env.ELASTIC_PASSWORD || '',
    },
});
