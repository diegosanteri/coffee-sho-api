import { Controller, Get, Post, Put, Delete, Param, Query, DefaultValuePipe, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ProductService } from './product.service';
import { PaginateQuery } from '../common/paginate.query';
import { ProductDomain } from './domain/product.domain';
import { ParseSearchPipe } from '../common/pipe/parse_search.pipe';
import { SearchQuery } from '../common/model/search_query';
import { CreateProductDomain } from './domain/create_product.domain';
import { ApiQuery } from '@nestjs/swagger';
import { ParseSortPipe } from 'src/common/pipe/parse_sort.pipe';
import { SortQuery } from 'src/common/model/sort_query';

@Controller("products")
export class ProductController {

  constructor(private readonly productService: ProductService) {}

  @Get("/")
  @ApiQuery({
    name: '_search',
    required: false,
    type: String
  })
  @ApiQuery({
    name: '_page',
    required: false,
    type: Number
  })
  @ApiQuery({
    name: '_limit',
    required: false,
    type: Number
  })
  async getProducts(
      @Query("_search", new ParseSearchPipe()) search: SearchQuery, 
      @Query("_sort", new ParseSortPipe()) sort: SortQuery, 
      @Query("_page", new DefaultValuePipe(1)) page: number, 
      @Query("_limit", new DefaultValuePipe(10)) limit: number): Promise<PaginateQuery<ProductDomain>> {
    return await this.productService.getProducts(search, page, limit, sort);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("/")
  async createProduct(@Body()product: CreateProductDomain) : Promise<ProductDomain>{
    return await this.productService.createProduct(product);
  }

  @Get("/:id")
  public getProductById(@Param('id') id: string): Promise<ProductDomain> {
    return this.productService.getProductById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put("/:id")
  public updateProduct(@Param('id') id: string, @Body()product: CreateProductDomain): Promise<void> {
    return this.productService.updateProduct(id, product);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete("/:id")
  public deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
