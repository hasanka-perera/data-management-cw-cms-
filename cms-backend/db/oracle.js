import oracledb from 'oracledb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure basic OracleDB settings
oracledb.outFormat = oracledb.OBJECT; // Return rows as objects instead of arrays
oracledb.autoCommit = true;          // Enable auto-commit for transactions

/**
 * Establishes a connection to the Oracle database.
 * @returns {Promise<oracledb.Connection>} A promise that resolves to the database connection.
 */
export async function connectOracle() {
    try {
        // Authenticate using credentials from the environment
        const connection = await oracledb.getConnection({
            user: process.env.Oracle_db_user,
            password: process.env.Oracle_db_password,
            connectString: process.env.Oracle_connect_string
        });
        console.log('OracleDB Connected');
        return connection;
    } catch (err) {
        // Log connection failure and propagate error
        console.error('OracleDB Connection Error:', err);
        throw err;
    }
}
