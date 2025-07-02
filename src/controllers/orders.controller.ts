import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Body, 
  Param, 
  ParseIntPipe, 
  Query, 
  Logger,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiQuery 
} from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderStatusDto, OrderStatus } from '../dto/order.dto';

@ApiTags('orders')
@Controller('api/orders')
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);
  
  // Simulación de base de datos en memoria
  private orders = [
    {
      id: 1,
      customerName: 'Juan Pérez',
      customerEmail: 'juan@example.com',
      customerPhone: '+54 2284 123456',
      shippingAddress: 'Av. San Martín 123, Olavarría',
      items: [
        { productId: 1, quantity: 1, price: 1299.99, productName: 'Laptop Gaming Pro' },
        { productId: 2, quantity: 2, price: 89.99, productName: 'Mouse Inalámbrico' }
      ],
      total: 1479.97,
      status: OrderStatus.CONFIRMED,
      notes: 'Entregar por la mañana',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 2,
      customerName: 'María García',
      customerEmail: 'maria@example.com',
      customerPhone: '+54 2284 654321',
      shippingAddress: 'Belgrano 456, Olavarría',
      items: [
        { productId: 3, quantity: 1, price: 149.99, productName: 'Teclado Mecánico' }
      ],
      total: 149.99,
      status: OrderStatus.PENDING,
      notes: '',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    }
  ];

  @Get()
  @ApiOperation({ summary: 'Obtener todas las órdenes' })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar por estado', enum: OrderStatus })
  @ApiQuery({ name: 'customerEmail', required: false, description: 'Filtrar por email del cliente' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de órdenes obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'array' },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' }
      }
    }
  })
  findAll(
    @Query('status') status?: OrderStatus,
    @Query('customerEmail') customerEmail?: string
  ) {
    this.logger.log('Consulta de todas las órdenes');
    
    let filteredOrders = this.orders;
    
    if (status) {
      filteredOrders = filteredOrders.filter(o => o.status === status);
    }
    
    if (customerEmail) {
      filteredOrders = filteredOrders.filter(o => 
        o.customerEmail.toLowerCase().includes(customerEmail.toLowerCase())
      );
    }

    return {
      data: filteredOrders,
      total: filteredOrders.length,
      page: 1,
      limit: filteredOrders.length
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener orden por ID' })
  @ApiParam({ name: 'id', description: 'ID de la orden', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Orden encontrada' 
  })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Consulta de orden con ID: ${id}`);
    
    const order = this.orders.find(o => o.id === id);
    
    if (!order) {
      return { 
        statusCode: 404, 
        message: 'Orden no encontrada',
        timestamp: new Date().toISOString()
      };
    }
    
    return order;
  }

  @Post()
  @ApiOperation({ summary: 'Crear nueva orden' })
  @ApiResponse({ 
    status: 201, 
    description: 'Orden creada exitosamente' 
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderDto: CreateOrderDto) {
    this.logger.log('Creación de nueva orden', { customer: createOrderDto.customerName });
    
    // Simular cálculo del total (en un caso real, buscarías los productos en la BD)
    const total = createOrderDto.items.reduce((sum, item) => {
      // Simular precios de productos
      const prices = { 1: 1299.99, 2: 89.99, 3: 149.99 };
      return sum + (prices[item.productId as keyof typeof prices] || 0) * item.quantity;
    }, 0);
    
    // Transformar items para incluir precio y nombre del producto
    const itemsWithDetails = createOrderDto.items.map(item => {
      const prices = { 1: 1299.99, 2: 89.99, 3: 149.99 };
      const productNames = { 1: 'Laptop Gaming Pro', 2: 'Mouse Inalámbrico', 3: 'Teclado Mecánico' };
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: prices[item.productId as keyof typeof prices] || 0,
        productName: productNames[item.productId as keyof typeof productNames] || 'Producto'
      };
    });

    const newOrder = {
      id: Math.max(...this.orders.map(o => o.id)) + 1,
      customerName: createOrderDto.customerName,
      customerEmail: createOrderDto.customerEmail,
      customerPhone: createOrderDto.customerPhone || '',
      shippingAddress: createOrderDto.shippingAddress,
      items: itemsWithDetails,
      total,
      status: OrderStatus.PENDING,
      notes: createOrderDto.notes || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.orders.push(newOrder);
    
    return {
      message: 'Orden creada exitosamente',
      data: newOrder,
      timestamp: new Date().toISOString()
    };
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Actualizar estado de la orden' })
  @ApiParam({ name: 'id', description: 'ID de la orden', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Estado de orden actualizado exitosamente' 
  })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateOrderStatusDto
  ) {
    this.logger.log(`Actualización de estado de orden con ID: ${id}`, { 
      newStatus: updateStatusDto.status 
    });
    
    const orderIndex = this.orders.findIndex(o => o.id === id);
    
    if (orderIndex === -1) {
      return { 
        statusCode: 404, 
        message: 'Orden no encontrada',
        timestamp: new Date().toISOString()
      };
    }
    
    this.orders[orderIndex] = {
      ...this.orders[orderIndex],
      status: updateStatusDto.status,
      updatedAt: new Date()
    };
    
    return {
      message: 'Estado de orden actualizado exitosamente',
      data: this.orders[orderIndex],
      timestamp: new Date().toISOString()
    };
  }

  @Get('customer/:email')
  @ApiOperation({ summary: 'Obtener órdenes por email del cliente' })
  @ApiParam({ name: 'email', description: 'Email del cliente', example: 'juan@example.com' })
  @ApiResponse({ 
    status: 200, 
    description: 'Órdenes del cliente encontradas' 
  })
  findByCustomerEmail(@Param('email') email: string) {
    this.logger.log(`Consulta de órdenes por email: ${email}`);
    
    const customerOrders = this.orders.filter(o => 
      o.customerEmail.toLowerCase() === email.toLowerCase()
    );
    
    return {
      data: customerOrders,
      total: customerOrders.length,
      customerEmail: email
    };
  }
} 