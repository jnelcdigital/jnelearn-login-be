import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, isNumber } from 'class-validator';

export class FindUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  kode_cabang?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nama_cabang?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  size?: number;
}
