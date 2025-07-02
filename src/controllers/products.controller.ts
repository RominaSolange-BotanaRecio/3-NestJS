import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
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
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);
  
  // Simulación de base de datos en memoria
  private products = [
    {
      id: 1,
      name: 'Laptop Gaming Pro',
      description: 'Laptop gaming de alta gama con RTX 4080',
      price: 1299.99,
      stock: 50,
      category: 'Electrónicos',
      imageUrl: 'https://example.com/laptop.jpg',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 2,
      name: 'Mouse Inalámbrico',
      description: 'Mouse gaming inalámbrico con 25K DPI',
      price: 89.99,
      stock: 100,
      category: 'Accesorios',
      imageUrl: 'https://example.com/mouse.jpg',
      isActive: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    },
    {
      id: 3,
      name: 'Teclado Mecánico',
      description: 'Teclado mecánico RGB con switches Cherry MX',
      price: 149.99,
      stock: 75,
      category: 'Accesorios',
      imageUrl: 'https://example.com/keyboard.jpg',
      isActive: true,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    }
  ];

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiQuery({ name: 'category', required: false, description: 'Filtrar por categoría' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Precio mínimo' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Precio máximo' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de productos obtenida exitosamente',
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
    @Query('category') category?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string
  ) {
    this.logger.log('Consulta de todos los productos');
    
    let filteredProducts = this.products.filter(p => p.isActive);
    
    if (category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category?.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    return {
      data: filteredProducts,
      total: filteredProducts.length,
      page: 1,
      limit: filteredProducts.length
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Producto encontrado' 
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Consulta de producto con ID: ${id}`);
    
    const product = this.products.find(p => p.id === id && p.isActive);
    
    if (!product) {
      return { 
        statusCode: 404, 
        message: 'Producto no encontrado',
        timestamp: new Date().toISOString()
      };
    }
    
    return product;
  }

  @Post()
  @ApiOperation({ summary: 'Crear nuevo producto' })
  @ApiResponse({ 
    status: 201, 
    description: 'Producto creado exitosamente' 
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    this.logger.log('Creación de nuevo producto', { product: createProductDto.name });
    
    const newProduct = {
      id: Math.max(...this.products.map(p => p.id)) + 1,
      ...createProductDto,
      category: createProductDto.category || '',
      imageUrl: createProductDto.imageUrl || '',
      isActive: createProductDto.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.products.push(newProduct);
    
    return {
      message: 'Producto creado exitosamente',
      data: newProduct,
      timestamp: new Date().toISOString()
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar producto existente' })
  @ApiParam({ name: 'id', description: 'ID del producto', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Producto actualizado exitosamente' 
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    this.logger.log(`Actualización de producto con ID: ${id}`);
    
    const productIndex = this.products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return { 
        statusCode: 404, 
        message: 'Producto no encontrado',
        timestamp: new Date().toISOString()
      };
    }
    
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
      updatedAt: new Date()
    };
    
    return {
      message: 'Producto actualizado exitosamente',
      data: this.products[productIndex],
      timestamp: new Date().toISOString()
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar producto (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del producto', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Producto eliminado exitosamente' 
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Eliminación de producto con ID: ${id}`);
    
    const productIndex = this.products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      return { 
        statusCode: 404, 
        message: 'Producto no encontrado',
        timestamp: new Date().toISOString()
      };
    }
    
    this.products[productIndex].isActive = false;
    this.products[productIndex].updatedAt = new Date();
    
    return {
      message: 'Producto eliminado exitosamente',
      timestamp: new Date().toISOString()
    };
  }
} 