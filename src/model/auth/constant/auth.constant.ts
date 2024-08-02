import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export const roundsOfHashing = 10;

export class LoginResponse {
  @IsNumber()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  kode_cabang: string;

  @IsString()
  @ApiProperty()
  nama_cabang: string;

  @IsString()
  @ApiProperty()
  role: string;

  @IsString()
  @ApiProperty()
  accessToken: string;
}