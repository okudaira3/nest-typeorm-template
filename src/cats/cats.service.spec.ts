import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CatRepository } from './cats.repository';
import { Cat } from './entities/cat.entity';
import { UpdateCatDto } from './dto/update-cat.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

describe('CatsServiceの正常系のテスト', () => {
  const mockFind = (): Promise<Cat[]> => {
    return Promise.resolve([
      { id: 1, name: 'ねこ' },
      { id: 2, name: 'ネコ' },
    ]);
  };

  const mockFindOneBy = (id: number) => {
    return {
      id: 1,
      name: 'ねこ',
    };
  };

  const mockUpdate = (id: number, name: string): Promise<UpdateResult> => {
    return Promise.resolve({
      raw: 1,
      affected: 2,
      generatedMaps: [],
    });
  };

  const mockDelete = (): Promise<DeleteResult> => {
    return Promise.resolve({
      raw: 1,
      affected: 2,
    });
  };

  let catsService: CatsService;
  let catRepository: CatRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: CatRepository,
          useFactory: () => ({
            find: jest.fn(mockFind),
            findOneBy: jest.fn(mockFindOneBy),
            update: jest.fn(mockUpdate),
            delete: jest.fn(mockDelete),
          }),
        },
      ],
    }).compile();

    catsService = module.get<CatsService>(CatsService);
    catRepository = module.get<CatRepository>(CatRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    // expect(catsService).toBeDefined();
    expect(catRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('タスクの配列を返すこと', async () => {
      await catsService.findAll();
      const expected = [
        { id: 1, name: 'ねこ' },
        { id: 2, name: 'ネコ' },
      ];
      const actual = await catsService.findAll();
      expect(actual).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('タスクの配列を返すこと', async () => {
      const id = 1;
      const expected = { id: 1, name: 'ねこ' };
      const actual = await catsService.findOne(id);
      expect(actual).toEqual(expected);
    });
  });

  describe('update', () => {
    it('更新されたタスクを返すこと', async () => {
      const updateTargetId = 1;
      const updateDto: UpdateCatDto = {
        name: '更新されたねこ',
      };

      // update 内では findOneBy が呼び出されている。 findOneBy のモックからは { id: 1, name: 'ねこ' } が返される。
      const expected = { id: 1, name: 'ねこ' };

      const actual = await catsService.update(updateTargetId, updateDto);
      expect(actual).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('削除された結果を返すこと', async () => {
      const targetId = 1;
      const expected = {
        raw: 1,
        affected: 2,
      };
      const actual = await catsService.remove(targetId);
      expect(actual).toEqual(expected);
    });
  });
});
