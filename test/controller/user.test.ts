import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {
  let app;

  beforeAll(async () => {
    // 创建应用实例
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    // 关闭应用
    await close(app);
  });

  it('should POST /user/register - success', async () => {
    // 测试注册成功的情况
    const result = await createHttpRequest(app)
      .post('/user/register')
      .send({
        nickname: 'testuser',
        password: 'testpassword'
      });

    // 验证响应
    expect(result.status).toBe(200);
    expect(result.body).toBe('注册成功');
  });

  it('should POST /user/register - user already exists', async () => {
    // 测试重复注册的情况
    const result = await createHttpRequest(app)
      .post('/user/register')
      .send({
        nickname: 'testuser',
        password: 'testpassword'
      });

    // 验证响应
    expect(result.status).toBe(200);
    expect(result.body).toBe('用户已存在');
  });

  it('should POST /user/login - success', async () => {
    // 测试登录成功的情况
    const result = await createHttpRequest(app)
      .post('/user/login')
      .send({
        nickname: 'testuser',
        password: 'testpassword'
      });

    // 验证响应
    expect(result.status).toBe(200);
    expect(result.body).toBe('登录成功');
  });

  it('should POST /user/login - user not found', async () => {
    // 测试用户不存在的情况
    const result = await createHttpRequest(app)
      .post('/user/login')
      .send({
        nickname: 'nonexistentuser',
        password: 'testpassword'
      });

    // 验证响应
    expect(result.status).toBe(200);
    expect(result.body).toBe('用户不存在');
  });
}); 