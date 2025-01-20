import { Controller, Get,Query,
   Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @Get()
  findFilter(@Query() filter: { name?: string; price?: number; description?: string; techKeywords?: string[] }) {
    return this.productsService.find(filter);
  }
  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.productsService.findOne(+id);
  // }

  

}
