import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly products = [
    { id:1,name: 'Product 1', price: 100 },
    { id:2,name: 'Product 2', price: 200 },
  ];

  create(createProductDto: CreateProductDto) {
    const id = this.products.length + 1;
    createProductDto.id = id;
    this.products.push(createProductDto);

    return `This action adds a new product:
      ${JSON.stringify(this.products)}`;
  }

  findAll() {
    return `This action returns all products:
      ${JSON.stringify(this.products)}`;
  }

  findOne(name: string) {
    const product = this.products.find((product) => product.name === name);
    return `This action returns a ${name} product:
      ${product?JSON.stringify(product):'Product not found with NAME: '+name}`;
  }

  update(productId: number,req:any, updateProductDto: UpdateProductDto) {
    // Find the index of the product with the given NAME:
    const productIndex = this.products.findIndex((product) => product.id === Number(productId));
  
    // Check if the product exists
    if (productIndex === -1) {
      return `Product with ID: ${productId} not found.`;
    }
    updateProductDto?.name && (this.products[productIndex].name = updateProductDto.name);
    
    // Return the updated product
    return this.products[productIndex];
  }
  

  remove(name: string) {
    const productIndex = this.products.findIndex((product) => product.name === name);
    if (productIndex === -1) {
      return `Product with NAME: ${name} not found.`;
    }
    this.products.splice(productIndex, 1);
    return `This action removes a #${name} product:
      ${JSON.stringify(this.products)}`;
  }
}
