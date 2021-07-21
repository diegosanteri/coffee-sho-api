import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";
import { ProductEntity } from "./entity/product.entity";
import { ProductDomain } from "../domain/product.domain";
import { PaginateQuery } from "src/common/paginate.query";
import { SearchQuery } from "src/common/model/search_query";
import { CreateProductDomain } from "../domain/create_product.domain";
import ProductMapper from "../product.mapper";
import { Optional } from "typescript-optional";
import { SortQuery } from "src/common/model/sort_query";

@Injectable()
export default class ProductRepository {

    constructor(
        @InjectModel('Product') private readonly productModel: PaginateModel<ProductEntity>,
    ) {}
    
    async getProducts(search: SearchQuery, page: number, limit: number, sort: SortQuery): Promise<PaginateQuery<ProductDomain>> {

        let response = new PaginateQuery<ProductDomain>();
        const productResponse = await this.productModel.paginate(search.filter, {page, perPage: limit, sort: sort.sort});

        response.limit = limit;
        response.page = productResponse.pagination.page;
        response.docs =  ProductMapper.toDomains(productResponse.data);

        return response;
    }

    async createProduct(product: CreateProductDomain) : Promise<Optional<ProductDomain>> {

        let productCreated = new this.productModel(product);
        productCreated = await productCreated.save();
        return ProductMapper.toDomain(productCreated);
    }

    async updateProduct(_id: string, product: CreateProductDomain) : Promise<void> {

        await this.productModel.updateOne({_id}, {$set: product});

       return;
    }

    async getProductById(productId: string) : Promise<Optional<ProductDomain>> {

        let productCreated = await this.productModel.findOne({_id: productId});
        return ProductMapper.toDomain(productCreated);
    }

    async deleteProduct(productId: string) : Promise<void>{

        await this.productModel.deleteOne({_id: productId});
        return;
    }
}