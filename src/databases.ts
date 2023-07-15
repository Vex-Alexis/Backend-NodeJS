import { createPool } from 'mysql2/promise'
import config from './config';

export async function connect(){
    const connection = await createPool({
        host: config.DB_HOST,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        database: config.DB_DATABASE,
        connectionLimit: config.DB_CONNECTION_LIMIT
    });
    return connection;
}