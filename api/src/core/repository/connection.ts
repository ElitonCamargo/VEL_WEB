import mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';
import { dbConfig } from "../config/config.ts";


const pool: Pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.name,
    password: dbConfig.password,
    waitForConnections: true, //Se deve ou não esperar por uma conexão disponível quando o limite de conexões for atingido.
    connectionLimit: 10, //O número máximo de conexões simultâneas permitidas no pool.
    queueLimit: 50, //O número máximo de consultas que podem ficar na fila de espera quando todas as conexões estão ocupadas.
    connectTimeout: 10000 // Tempo máximo para estabelecer a conexão
});

export default pool;