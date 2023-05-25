import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CatRepository extends Repository<Cat> {
  constructor(@InjectRepository(Cat) repository: Repository<Cat>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
