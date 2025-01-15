import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly products = [
    { name: 'Product 1', price: 100 },
    { name: 'Product 2', price: 200 },
  ];

  create(createProductDto: CreateProductDto) {
    this.products.push(createProductDto);

    return `This action adds a new product:
      ${JSON.stringify(createProductDto)}`;
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

  update(name: string, updateProductDto: UpdateProductDto) {
    // Find the index of the product with the given NAME:
    const productIndex = this.products.findIndex((product) => product.name === name);
  
    // Check if the product exists
    if (productIndex === -1) {
      return `Product with NAME: ${name} not found.`;
    }
  
    // Update the product by merging existing data with updateProductDto
    const updatedProduct = {
      ...this.products[productIndex], // Existing product data
      ...updateProductDto,           // New data from the DTO
    };
  
    // Save the updated product back to the products array
    this.products[productIndex] = updatedProduct;
  
    // Return the updated product
    return updatedProduct;
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
