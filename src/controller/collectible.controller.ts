import { Controller, Post, Get, Del, Param, Body, Inject } from '@midwayjs/core';
import { CollectibleService } from '../service/collectible.service';

@Controller('/collectible')
export class CollectibleController {
  @Inject()
  collectibleService: CollectibleService;

  @Post('/')
  async create(@Body() body: { blindBoxId: number; name: string }) {
    return await this.collectibleService.create(body.blindBoxId, body.name);
  }

  @Get('/')
  async getAll() {
    return await this.collectibleService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number) {
    return await this.collectibleService.getById(id);
  }

  @Del('/:id')
  async delete(@Param('id') id: number) {
    return await this.collectibleService.delete(id);
  }
}
