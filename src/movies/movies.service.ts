import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  getOne(id: number): Movie {
    const movie = this.movies.find(movie => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`There is no movie with ID ${id}`);
    }
    return movie;
  }
  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter(movie => movie.id !== +id);
  }
  changeOne(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}