/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allDbEntity } from './DbEntity';
@Module({
  imports: [TypeOrmModule.forFeature([...allDbEntity])],
  exports: [TypeOrmModule],
})
export class SharedDBModule {}
