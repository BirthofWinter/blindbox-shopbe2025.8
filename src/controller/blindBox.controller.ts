// src/controller/blindBox.controller.ts
import { Controller, Post, Get, Put, Del, Param, Body, Inject } from '@midwayjs/core';
import { BlindBoxService } from '../service/blindBox.service';
import { BlindBox } from '../model/blindBox';

@Controller('/blindbox')
export class BlindBoxController {
  @Inject()
  blindBoxService: BlindBoxService;

  @Post('/')
  async create(@Body() body: { price: number; type: string }): Promise<BlindBox> {
    return await this.blindBoxService.create(body.price, body.type);
  }

  @Get('/')
  async getAll(): Promise<BlindBox[]> {
    return await this.blindBoxService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: number): Promise<BlindBox | null> {
    return await this.blindBoxService.findById(id);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() data: Partial<BlindBox>): Promise<string> {
    return await this.blindBoxService.update(id, data);
  }

  @Del('/:id')
  async delete(@Param('id') id: number): Promise<string> {
    return await this.blindBoxService.delete(id);
  }
}
