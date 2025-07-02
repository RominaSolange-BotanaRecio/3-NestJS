import { IsNumber, IsPositive, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetUserDto {
  @IsNumber()
  @IsPositive({ message: 'El ID debe ser un número positivo' })
  @Transform(({ value }) => parseInt(value))
  id: number;
} 