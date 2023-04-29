import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class profileDTO {

  @IsString()
  buscador: string;

  @IsString()
  donde: string;

}