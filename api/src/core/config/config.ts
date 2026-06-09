// ****************** Configuração do banco de dados ************************** //
import dotenv from 'dotenv';
dotenv.config();

type DbConfig = {
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
};


export const dbConfig = {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    name: process.env.DB_NAME ?? "vel_web_api_db",
    user: process.env.DB_USER ?? "appuser",
    password: process.env.DB_PASSWORD ?? "123456"
} satisfies DbConfig;


