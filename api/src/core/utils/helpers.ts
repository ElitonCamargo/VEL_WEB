import pool from '../repository/connection.ts';


export const getCurrentDateMySQLFormat = (): string => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export const hasOwnKey = (obj: object, key: string | symbol): boolean => {
    return Object.prototype.hasOwnProperty.call(obj, key);
};



export const connectDatabaseStatus = async (): Promise<{ connected: boolean; state: string; message: string; checkedAt: string }> => {
    try {
        await pool.query('SELECT 1');

        return {
            connected: true,
            state: 'connected',
            message: 'Conectado ao banco de dados',
            checkedAt: new Date().toISOString()
        };
    } catch {
        return {
            connected: false,
            state: 'disconnected',
            message: 'Desconectado do banco de dados',
            checkedAt: new Date().toISOString()
        };
    }
};