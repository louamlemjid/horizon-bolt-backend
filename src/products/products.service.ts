import { Injectable ,NotFoundException} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class ProductsService {
  private supabase:SupabaseClient;
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_API_KEY,
    );
  }
  async create(createProductDto: CreateProductDto) {
    
    // Insert the product into the database
    const { data, error } = await this.supabase
      .from('products')
      .insert({
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        is_paid: createProductDto.isPaid ?? false, // Default to false if not provided
        tech_keywords: createProductDto.techKeywords ?? [], // Default to an empty array
        preview_link: createProductDto.previewLink,
        bolt_link: createProductDto.boltLink,
        owner_id: createProductDto.ownerId,
      })
      .select('*');
      console.log("from service product: ",data);
    if (error) throw new Error(error.message);
    return data;
  }


  async findAll() {
    const { data, error } = await this.supabase
      .from('products')
      .select('*');
  
    if (error) {
      throw new NotFoundException;
    }
  
    return data;
  }
  
  async find(filter: any) {
    let query = this.supabase.from('products').select('*');
  
    if (filter?.name) {
      query = query.eq('name', filter.name);
    }
    if (filter?.price) {
      query = query.eq('price', Number(filter.price));
    }
    if (filter?.description) {
      query = query.ilike('description', `${filter.description}%`); // `ilike` allows case-insensitive filtering
    }
    if (filter?.techKeywords) {
      query = query.or(
        filter.techKeywords.map(keyword => `tech_keywords.cs.${keyword}`).join(',')
      ); // `cs` checks if the array contains the keyword
    }
  
    const { data, error } = await query;
  
    if (error) {
      throw new NotFoundException;
    }
  
    return data;
  }
  
  async findOne(productId: number) {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();
  
    if (error || !data) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  
    return data;
  }
  

  async update(productId: number,req:any, updateProductDto: UpdateProductDto) {
    const { data, error } = await this.supabase
      .from('products')
      .update({
        ...(updateProductDto.name && { name: updateProductDto.name }),
        ...(updateProductDto.price && { price: updateProductDto.price }),
        ...(updateProductDto.previewLink && { preview_link: updateProductDto.previewLink }),
        ...(updateProductDto.description && { description: updateProductDto.description }),
        ...(updateProductDto.boltLink && { bolt_link: updateProductDto.boltLink }),
        ...(updateProductDto.techKeywords && { tech_keywords: updateProductDto.techKeywords }),
      })
      .eq('id', productId)
      .eq('owner_id', req.user.id)
      .select();
  
    if (error) {
      throw new NotFoundException;
    }
  
    return data[0]; 
  }
  
  

  async remove(req:any,productId: number) {
    const { error } = await this.supabase
    .from('products')
    .delete()
    .eq('id', productId)
    .eq('owner_id', req.user.id);
  
    if (error) {
      throw new NotFoundException;
    }
  
    return `Product with ID ${productId} successfully removed`;
  }
  
}
