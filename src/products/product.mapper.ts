import { ProductEntity } from "./repository/entity/product.entity";
import { ProductDomain } from "./domain/product.domain";
import { Optional } from 'typescript-optional';

export default class ProductMapper {

    public static toDomain(doc: ProductEntity): Optional<ProductDomain> {

        if (!doc) {
          return Optional.empty<ProductDomain>();
        }

        let domain = new ProductDomain();
        domain._id = doc._id;
        domain.name = doc.name;
        domain.description = doc.description;
        domain.image = doc.image;
        domain.price = doc.price;
        domain.preparationTimeInMinutes = doc.preparationTimeInMinutes;

        return Optional.of(domain);
    }

    public static toDomains(productsEntity: ProductEntity[]): ProductDomain[] {
        return productsEntity.map(productEntity => this.toDomain(productEntity).get());
    }
}