import { ComboEntity } from "./repository/entity/combo.entity";
import { ComboDomain } from "./domain/combo.domain";
import { Optional } from 'typescript-optional';

export default class ProductMapper {

    public static toDomain(doc: ComboEntity): Optional<ComboDomain> {

        if (!doc) {
          return Optional.empty<ComboDomain>();
        }

        let domain = new ComboDomain();
        domain._id = doc._id;
        domain.name = doc.name;
        domain.productIds = doc.productIds;
        domain.discountPercentage = doc.discountPercentage;

        return Optional.of(domain);
    }

    public static toDomains(productsEntity: ComboEntity[]): ComboDomain[] {
        return productsEntity.map(productEntity => this.toDomain(productEntity).get());
    }
}