import { Injectable, PreconditionFailedException, NotFoundException } from '@nestjs/common';
import { PaginateQuery } from 'src/common/paginate.query';
import { ProductDomain } from './domain/product.domain';
import ProductRepository from './repository/product.repository';
import { SearchQuery } from 'src/common/model/search_query';
import { CreateProductDomain } from './domain/create_product.domain';
import { SortQuery } from 'src/common/model/sort_query';

@Injectable()
export class ProductService {

  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(search: SearchQuery, page: number, limit: number, sort: SortQuery): Promise<PaginateQuery<ProductDomain>> {
    return await this.productRepository.getProducts(search, page, limit, sort);
  }

  async createProduct(product: CreateProductDomain) : Promise<ProductDomain> {
    let createdProduct = await this.productRepository.createProduct(product);
    if(createdProduct.isEmpty()) {
      throw new PreconditionFailedException("Some condition failed while trying to create a product");
    }
    return createdProduct.get();
  }

  async getProductById(id: string) : Promise<ProductDomain>{
    
    let product = await this.productRepository.getProductById(id);
    if(product.isEmpty()) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product.get();
  }

  async updateProduct(id: string, productUpdate: CreateProductDomain) : Promise<void> {
    let product = this.getProductById(id);

    Object.keys(product).filter(key => key !== "_id").forEach(key => {

      if(!productUpdate[key]) {
        productUpdate[key] = product[key];
      }
    });

    await this.productRepository.updateProduct(id, productUpdate);

    return;
  }

  async deleteProduct(id: string) : Promise<void> {
    await this.getProductById(id);
    await this.productRepository.deleteProduct(id);
    return;
  }
}
