import { Connection, ConnectionManager, createConnection, getConnectionManager } from 'typeorm';
import entities from './entities';

export default class Database {
  connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  async connect() {
    return await createConnection({
      entities,
      type: 'postgres',
      database: process.env.DATABASE_DATABASE,
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      synchronize: true,
      logging: false,
    });
  }

  async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = 'default';
    if (this.connectionManager.has(CONNECTION_NAME)) {
      const connection = this.connectionManager.get(CONNECTION_NAME);
      try {
        if (connection.isConnected) {
          await connection.close();
        }
      } catch {}
      return connection.connect();
    }

    return this.connect();
  }
}
