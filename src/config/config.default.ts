import { MidwayConfig } from '@midwayjs/core';
import path = require('path');
import { User } from '../model/user';
import { BlindBox } from '../model/blindBox';
import { Collectible } from '../model/collectible';
import { Order } from '../model/order';


export default {
  // 用于 cookie 签名的密钥
  keys: '1754102256718_4745',

  koa: {
    port: 7001, // 设置 Koa 服务器端口
  },

  // 跨域配置
  cors: {
    credentials: true,
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    allowHeaders: 'Content-Type,Authorization',
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
          User,
          BlindBox,
          Collectible,
          Order
        ],
        autoLoadEntities: true


      }
    }
  }
} as MidwayConfig;
