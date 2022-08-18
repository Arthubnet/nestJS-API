import { IsNumber, IsString } from 'class-validator';

/* Data transfer object. VC code helps us with object property options after it too*/
export class CreateMovieDto {
  @IsString() //checks what user puts on that side to the object. We can limit it with different properties(lengths, type...)
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true })
  readonly genres: string[];
}
