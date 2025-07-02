import { IsString, IsNumber, IsOptional, IsNotEmpty, Min, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export class OrderItemDto {
  @ApiProperty({
    description: 'ID del producto',
    example: 1
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'Cantidad del producto',
    example: 2,
    minimum: 1
  })
  @IsNumber()
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan Pérez'
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del cliente es requerido' })
  customerName: string;

  @ApiProperty({
    description: 'Email del cliente',
    example: 'juan@example.com'
  })
  @IsString()
  @IsNotEmpty({ message: 'El email es requerido' })
  customerEmail: string;

  @ApiProperty({
    description: 'Dirección de envío',
    example: 'Av. San Martín 123, Olavarría'
  })
  @IsString()
  @IsNotEmpty({ message: 'La dirección es requerida' })
  shippingAddress: string;

  @ApiProperty({
    description: 'Teléfono del cliente',
    example: '+54 2284 123456',
    required: false
  })
  @IsOptional()
  @IsString()
  customerPhone?: string;

  @ApiProperty({
    description: 'Items del pedido',
    type: [OrderItemDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({
    description: 'Notas adicionales del pedido',
    example: 'Entregar por la mañana',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Nuevo estado del pedido',
    enum: OrderStatus,
    example: OrderStatus.CONFIRMED
  })
  @IsEnum(OrderStatus, { message: 'Estado inválido' })
  status: OrderStatus;

  @ApiProperty({
    description: 'Comentarios sobre el cambio de estado',
    example: 'Pedido confirmado y listo para envío',
    required: false
  })
  @IsOptional()
  @IsString()
  comments?: string;
} 