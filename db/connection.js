import mysql from 'mysql';
import {
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
} from '../utils/config.js';

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
});

db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.message);
      process.exit(1);
    }
    console.log('Connected to MySQL database.');
});

export default db;