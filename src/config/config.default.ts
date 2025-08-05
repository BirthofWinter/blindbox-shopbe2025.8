import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';
import path = require('path');
import '../model/user';


export default {
  // 用于 cookie 签名的密钥
  keys: '1754102256718_4745',

  koa: {
    port: 7001, // 设置 Koa 服务器端口
  },

  // TypeORM 配置，连接到 SQLite 数据库
  typeorm: {
    dataSource: {
      default: {
        type: 'sqlite',
        database: path.join(__dirname, 'webapp.sqlite'),
        synchronize: true,
        logging: true,
        entities: [
          join(process.cwd(), 'src/model/user.ts')
        ]

      }
    }
  }
} as MidwayConfig;
