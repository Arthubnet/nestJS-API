import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Body,
  Query,
} from '@nestjs/common';

@Controller('movies') // can put link over here
export class MoviesController {
  @Get()
  getAll() {
    return "LEt's see";
  }
  @Get('search')
  search(@Query('year') aYear: string) {
    return `We are gonna watch a movie from this year: ${aYear}`;
  }
  @Get('/:id')
  getMovie(@Param('id') id: string) {
    return `Movie id is: ${id}`;
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: string) {
    return `We are going to delete this movie: ${id}`;
  }
  @Patch('/:id')
  updateMovie(@Param('id') id: string, @Body() getBody) {
    return {
      id,
      ...getBody,
    };
  }
}
