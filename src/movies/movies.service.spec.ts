import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const movie = service.getAll();
      expect(movie).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Test'],
        year: 2012,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('Cant find non existed movie', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Test'],
        year: 2012,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return 404', () => {
      try {
        service.deleteOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('updateOne', () => {
    it('update the movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Test'],
        year: 2012,
      });
      service.changeOne(1, {
        title: 'Updated test movie',
      });
      const afterUpdate = service.getOne(1).title;
      expect(afterUpdate).toEqual('Updated test movie');
    });
  });
});
