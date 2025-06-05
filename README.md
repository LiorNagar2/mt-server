# mt-server

**mt-server** is a backend server application built with [NestJS](https://nestjs.com/) and TypeScript, designed for scalable multi-tenant SaaS (Software as a Service) solutions. It provides secure tenant, user, and product management with JWT-based authentication and MongoDB persistence.

---

## Features

- **Multi-Tenancy**: Isolate data and logic for multiple organizations (“tenants”). Each tenant gets its own JWT secret for secure authentication.
- **User Management**: Create, update, and manage users per tenant, with password hashing and tenant-aware authentication.
- **Product Management**: Manage products in a tenant-isolated context (feature in progress).
- **Authentication**: JWT-based authentication, scoped to each tenant.
- **Modular Design**: Extensible NestJS module structure for easy maintenance and feature addition.
- **Robust Logging**: Integrated request ID middleware and Winston logger with ElasticSearch transport for advanced observability and centralized logging.
- **MongoDB Integration**: Uses Mongoose for schema-based, multi-tenant data storage.

---

## Logging

The server uses a custom Winston logger (`winstonLogger.ts`) configured with:
- **Console Transport**: For local development and debugging.
- **ElasticSearch Transport**: For centralized log aggregation, search, and monitoring via ElasticSearch.

This enables advanced monitoring and troubleshooting options for production deployments.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or remote instance)
- ElasticSearch instance (for log aggregation, optional but recommended for production)

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the root or set environment variables:

- `MONGO_URI` – MongoDB connection string (example: `mongodb://localhost:27017/mt-server`)
- `JWT_SECRET` – Secret key for JWT authentication
- `SECURITY_ENCRYPTION_KEY` – Key for encrypting tenant JWT secrets
- `ELASTICSEARCH_NODE` – ElasticSearch node URL (for logging, e.g. `http://localhost:9200`)

More configuration options may be found in `src/config/config.ts`.

---

## Running the app

```bash
# Development
npm run start:dev

# Production
npm run start:prod

# Run with hot-reload (watch mode)
npm run start:dev
```

---

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## Project Structure

- `src/tenants/`: Tenant management (creation, isolation, JWT secret management)
- `src/users/`: Per-tenant user management and authentication
- `src/products/`: Tenant-specific product management (in progress)
- `src/auth/`: Authentication logic
- `src/services/logger/`: Winston logger (with ElasticSearch transport) and request tracing
- `src/config/`: Centralized configuration

---

## Contributing

Pull requests are welcome! For major changes, open an issue first to discuss your proposal.

---

## License

MIT
