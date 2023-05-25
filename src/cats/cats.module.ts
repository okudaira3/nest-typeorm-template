import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatRepository } from './cats.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  exports: [TypeOrmModule],
  controllers: [CatsController],
  providers: [CatsService, CatRepository],
})
export class CatsModule {}
