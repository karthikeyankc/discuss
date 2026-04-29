if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
    console.error('FATAL: JWT_SECRET environment variable is not set. Refusing to start in production.');
    process.exit(1);
}

export const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-insecure-secret-change-in-production';
export const PORT = parseInt(process.env.PORT, 10) || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
