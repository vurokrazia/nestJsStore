import { Controller, Get, Query, Param, Post, Body, Put, Delete, HttpStatus, HttpCode, ParseIntPipe, Res } from '@nestjs/common';
import { ProductsService } from '../../services/products.service';
import { CreateProductTdo, UpdateProductTdo } from '../../dtos/products.dtos';

@Controller('products') // 👈 Route
export class ProductsController {
  constructor(private productsService: ProductsService) { }
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreateProductTdo) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductTdo) {
    return this.productsService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(+id)
  }

}