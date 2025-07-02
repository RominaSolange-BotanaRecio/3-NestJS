import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EchoDto {
  @ApiProperty({
    description: 'Mensaje a enviar en el echo',
    example: 'Hola desde el cliente!',
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty({ message: 'El mensaje no puede estar vacío' })
  @MaxLength(500, { message: 'El mensaje no puede tener más de 500 caracteres' })
  message: string;

  @ApiProperty({
    description: 'Nombre opcional del remitente',
    example: 'Juan Pérez',
    required: false,
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  name?: string;
} 