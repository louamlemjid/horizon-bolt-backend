import { Injectable ,NotFoundException} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly products = [
    { id:1,name: 'Product 1', price: 100, previewLink: 'https://www.google.com', description: 'This is a product', boltLink: 'https://www.google.com', techKeywords: ['tech1'] },
    { id:2,name: 'Product 2', price: 200, previewLink: 'https://www.google.com', description: 'This is a product', boltLink: 'https://www.google.com', techKeywords: ['tech1','tech2'] },
  ];

  create(createProductDto: CreateProductDto) {
    const id = this.products.length + 1;
    createProductDto.id = id;
    this.products.push(createProductDto);

    return ;
  }

  findAll() {
    return this.products;
  }
  find(filter:any) {
    let filterList=this.products;
    filter?.name && (filterList=filterList.filter((product) => product.name === filter.name));
    filter?.price && (filterList=filterList.filter((product) => product.price === Number(filter.price)));
    filter?.description && (filterList=filterList.filter((product) => product.description.startsWith(filter.description)));
    filter?.techKeywords && (filterList = filterList.filter((product) =>
      product.techKeywords.some((keyword) => filter.techKeywords.includes(keyword))
    ))
    return filterList;
  }
  findOne(productId: number) {
    const product = this.products.findIndex((product) => product.id === Number(productId));
    if(product===-1){
      throw new NotFoundException;
    }
    return product;
  }

  update(productId: number,req:any, updateProductDto: UpdateProductDto) {
    // Find the index of the product with the given NAME:
    const productIndex =this.findOne(productId)
    updateProductDto?.name && (this.products[productIndex].name = updateProductDto.name);
    updateProductDto?.price && (this.products[productIndex].price = updateProductDto.price);
    updateProductDto?.previewLink && (this.products[productIndex].previewLink = updateProductDto.previewLink);
    updateProductDto?.description && (this.products[productIndex].description = updateProductDto.description);
    updateProductDto?.boltLink && (this.products[productIndex].boltLink = updateProductDto.boltLink);
    updateProductDto?.techKeywords && (this.products[productIndex].techKeywords = updateProductDto.techKeywords);
    // Return the updated product
    return this.products[productIndex];
  }
  

  remove(productId: number,req:any) {
    const productIndex =this.findOne(productId)

    this.products.splice(productIndex, 1);
    return `This action removes a #${productId} product:
      ${JSON.stringify(this.products)}`;
  }
}
