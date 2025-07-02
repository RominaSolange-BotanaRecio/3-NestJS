import { IsString, IsNumber, IsOptional, IsNotEmpty, Min, Max, IsUrl, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gaming Pro',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Laptop gaming de alta gama con RTX 4080',
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99,
    minimum: 0
  })
  @IsNumber()
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price: number;

  @ApiProperty({
    description: 'Stock disponible',
    example: 50,
    minimum: 0
  })
  @IsNumber()
  @Min(0, { message: 'El stock debe ser mayor o igual a 0' })
  stock: number;

  @ApiProperty({
    description: 'Categoría del producto',
    example: 'Electrónicos',
    required: false
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/image.jpg',
    required: false
  })
  @IsOptional()
  @IsUrl({}, { message: 'Debe ser una URL válida' })
  imageUrl?: string;

  @ApiProperty({
    description: 'Si el producto está activo',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Laptop Gaming Pro',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name?: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Laptop gaming de alta gama con RTX 4080',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price?: number;

  @ApiProperty({
    description: 'Stock disponible',
    example: 50,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'El stock debe ser mayor o igual a 0' })
  stock?: number;

  @ApiProperty({
    description: 'Categoría del producto',
    example: 'Electrónicos',
    required: false
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/image.jpg',
    required: false
  })
  @IsOptional()
  @IsUrl({}, { message: 'Debe ser una URL válida' })
  imageUrl?: string;

  @ApiProperty({
    description: 'Si el producto está activo',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
} 