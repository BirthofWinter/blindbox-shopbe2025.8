// src/config/database.config.ts
import { join } from 'path';

export const databaseConfig = {
  type: 'sqlite', // 使用 SQLite 数据库
  database: join(__dirname, 'data', 'database.sqlite'), // 设置数据库文件路径
  synchronize: true, // 是否自动同步数据库（开发阶段可以设置为 true）
  logging: true, // 是否开启 SQL 查询日志（可选）
  entities: [
    // 列出所有需要使用的实体
    join(__dirname, '../model/**/*.ts'), // 在 `src/model` 目录下查找实体类
  ],
};
