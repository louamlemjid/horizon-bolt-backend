import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
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

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    return `This action returns a #${id} product:
      ${product?JSON.stringify(product):'Product not found with ID #'+id}`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    // Find the index of the product with the given ID
    const productIndex = this.products.findIndex((product) => product.id === id);
  
    // Check if the product exists
    if (productIndex === -1) {
      return `Product with ID ${id} not found.`;
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
  

  remove(id: number) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return `Product with ID ${id} not found.`;
    }
    this.products.splice(productIndex, 1);
    return `This action removes a #${id} product:
      ${JSON.stringify(this.products)}`;
  }
}
