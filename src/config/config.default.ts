import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';


export default {
  // 用于 cookie 签名的密钥
  keys: '1754102256718_4745',

  koa: {
    port: 7001, // 设置 Koa 服务器端口
  },

  // TypeORM 配置，连接到 SQLite 数据库
  typeorm: {
    dataSource: {
      type: 'sqlite', // 使用 SQLite
      database: join(__dirname, 'data', 'database.sqlite'), // 数据库文件路径
      synchronize: true, // 自动同步数据库结构
      logging: true, // 是否显示 SQL 查询日志（开发阶段建议开启）
      entities: [
        // 列出所有的实体文件
        join(__dirname, '../model/**/*.ts'), // 查找 `src/model/` 下的实体类
      ],
    } as const, // 强制转换为常量，防止类型冲突
  },
} as MidwayConfig;
