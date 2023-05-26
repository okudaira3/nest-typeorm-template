import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { DeleteResult } from 'typeorm';

describe('CatsController - 正常系', () => {
  let controller: CatsController;
  let spyService: CatsService;

  const CatsServiceProvider = {
    provide: CatsService,
    useFactory: () => ({
      create: jest.fn((createCatDto: CreateCatDto): Promise<Cat> => {
        return Promise.resolve({ id: 1, name: 'ねこ' });
      }),
      findAll: jest.fn((): Promise<Cat[]> => {
        return Promise.resolve([
          { id: 1, name: 'ねこ' },
          { id: 2, name: 'ネコ' },
        ]);
      }),
      update: jest.fn((): Promise<Cat> => {
        return Promise.resolve({
          id: 1,
          name: 'ねこ',
        });
      }),
      remove: jest.fn((): Promise<DeleteResult> => {
        return Promise.resolve({
          raw: 1,
        });
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsServiceProvider],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    spyService = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create メソッドが呼ばれたとき', () => {
    const createCat: CreateCatDto = {
      name: 'ねこ',
    };
    it('CatsService の create メソッドが呼ばれること', () => {
      controller.create(createCat);
      expect(spyService.create).toHaveBeenCalled();
    });
    it('作成されたねこが返されること', async () => {
      const expected: Cat = {
        id: 1,
        name: 'ねこ',
      };

      const actual = await controller.create(createCat);
      expect(actual).toEqual(expected);
    });
  });

  describe('findAll メソッドが呼ばれたとき', () => {
    it('CatsService の findAll メソッドが呼ばれること', () => {
      controller.findAll();
      expect(spyService.findAll).toHaveBeenCalled();
    });
    it('ねこのリストが返されること', async () => {
      const expected: Cat[] = [
        {
          id: 1,
          name: 'ねこ',
        },
        {
          id: 2,
          name: 'ネコ',
        },
      ];

      const actual = await controller.findAll();
      expect(actual).toEqual(expected);
    });
  });

  describe('update メソッドが呼ばれたとき', () => {
    const updateId = '1';
    const updateCat: UpdateCatDto = {
      name: 'ねこ',
    };
    it('CatsService の update メソッドが呼ばれること', () => {
      controller.update(updateId, updateCat);
      expect(spyService.update).toHaveBeenCalled();
    });
    it('更新されたねこが返されること', async () => {
      const expected: Cat = {
        id: 1,
        name: 'ねこ',
      };

      const actual = await controller.update(updateId, updateCat);
      expect(actual).toEqual(expected);
    });
  });

  describe('remove メソッドが呼ばれたとき', () => {
    const removeId = '1';
    it('CatsService の remove メソッドが呼ばれること', () => {
      controller.remove(removeId);
      expect(spyService.remove).toHaveBeenCalled();
    });
  });
});
