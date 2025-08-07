import { Controller, Post, Get, Del, Param, Body, Inject } from '@midwayjs/core';
import { DisplayService } from '../service/display.service';

@Controller('/display')
export class DisplayController {
  @Inject()
  displayService: DisplayService;

  @Post('/:userId/set')
  async setDisplay(
    @Param('userId') userId: number,
    @Body() body: { collectibleId: number; position: number }
  ) {
    await this.displayService.setDisplay(userId, body.collectibleId, body.position);
    return { success: true, message: '展示品设置成功' };
  }

  @Del('/:userId/remove/:position')
  async removeDisplay(
    @Param('userId') userId: number,
    @Param('position') position: number
  ) {
    await this.displayService.removeDisplay(userId, position);
    return { success: true, message: '展示品已移除' };
  }

  @Get('/:userId')
  async getUserDisplays(@Param('userId') userId: number) {
    return await this.displayService.getUserDisplays(userId);
  }
}