import 'reflect-metadata';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config({ path: path.join(__dirname, '../../.env') });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.DB_DATABASE = 'test_db';
process.env.JWT_SECRET = 'test_secret';

// Increase timeout for tests
jest.setTimeout(30000);
