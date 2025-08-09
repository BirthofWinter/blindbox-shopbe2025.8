const axios = require('axios');

// 创建axios实例，设置最大重定向次数和超时时间
const api = axios.create({
  maxRedirects: 5,
  timeout: 10000
});

async function addData() {
  try {
    console.log('开始添加数据...');
    const baseUrl = 'http://localhost:7001';

    // 1. 添加用户
    console.log('添加用户...');
    const userResponse = await api.post(`${baseUrl}/user/register`, {
      nickname: 'winter',
      password: 'hyz123'
    });
    console.log('用户添加结果:', userResponse.data);

    // 2. 更新用户余额
    // 需要先登录获取用户ID
    const loginResponse = await api.post(`${baseUrl}/user/login`, {
      nickname: 'winter',
      password: 'hyz123'
    });
    console.log('用户登录结果:', loginResponse.data);
    const userId = loginResponse.data.data.id;

    console.log('更新用户余额...');
    const balanceResponse = await api.put(`${baseUrl}/user/${userId}/balance`, {
      balance: 9999909
    });
    console.log('余额更新结果:', balanceResponse.data);

    // 3. 添加盲盒
    console.log('添加盲盒...');
    const wawBoxResponse = await api.post(`${baseUrl}/blindbox`, {
      type: 'WAW型盲盒',
      price: 66.6
    });
    console.log('WAW型盲盒添加结果:', wawBoxResponse.data);

    const tethBoxResponse = await api.post(`${baseUrl}/blindbox`, {
      type: 'TETH型盲盒',
      price: 33.3
    });
    console.log('TETH型盲盒添加结果:', tethBoxResponse.data);

    const zayinBoxResponse = await api.post(`${baseUrl}/blindbox`, {
      type: 'ZAYIN型盲盒',
      price: 11.1
    });
    console.log('ZAYIN型盲盒添加结果:', zayinBoxResponse.data);

    const alephBoxResponse = await api.post(`${baseUrl}/blindbox`, {
      type: 'ALEPH型盲盒',
      price: 99.9
    });
    console.log('ALEPH型盲盒添加结果:', alephBoxResponse.data);

    // 4. 添加收藏品
    console.log('添加收藏品...');

    // ALEPH型收藏品
    const alephId = alephBoxResponse.data.data.id;
    const alephCollectibles = ['拟态', 'DaCaPo', '新星之声', '失乐园', '薄暝'];
    for (const name of alephCollectibles) {
      const response = await api.post(`${baseUrl}/collectible`, {
        blindBoxId: alephId,
        name
      });
      console.log(`收藏品 ${name} 添加结果:`, response.data);
    }

    // WAW型收藏品
    const wawId = wawBoxResponse.data.data.id;
    const wawCollectibles = ['提灯', '正义裁决者', '盈泪之剑', '月光', '圣宣'];
    for (const name of wawCollectibles) {
      const response = await api.post(`${baseUrl}/collectible`, {
        blindBoxId: wawId,
        name
      });
      console.log(`收藏品 ${name} 添加结果:`, response.data);
    }

    // TETH型收藏品
    const tethId = tethBoxResponse.data.data.id;
    const tethCollectibles = ['决死之心', '小喙', '落樱', '犄角', '诱捕幻灯'];
    for (const name of tethCollectibles) {
      const response = await api.post(`${baseUrl}/collectible`, {
        blindBoxId: tethId,
        name
      });
      console.log(`收藏品 ${name} 添加结果:`, response.data);
    }

    // ZAYIN型收藏品
    const zayinId = zayinBoxResponse.data.data.id;
    const zayinCollectibles = ['忏悔', '[祝福]', '翅振', '美味苏打', '谢顶之灾'];
    for (const name of zayinCollectibles) {
      const response = await api.post(`${baseUrl}/collectible`, {
        blindBoxId: zayinId,
        name
      });
      console.log(`收藏品 ${name} 添加结果:`, response.data);
    }

    console.log('所有数据添加完成!');
  } catch (error) {
    console.error('添加数据时出错:');
    if (error.response) {
      // 服务器响应了，但状态码不在2xx范围内
      console.error('状态码:', error.response.status);
      console.error('响应数据:', error.response.data);
    } else if (error.request) {
      // 请求已发送但没有收到响应
      console.error('没有收到响应:', error.request);
    } else {
      // 设置请求时发生错误
      console.error('错误信息:', error.message);
    }
    if (error.code === 'ECONNREFUSED') {
      console.error('无法连接到服务器，请确保后端服务正在运行');
    }
    if (error.message.includes('maxRedirects')) {
      console.error('超过最大重定向次数，请检查API端点是否正确');
    }
  }
}

addData();