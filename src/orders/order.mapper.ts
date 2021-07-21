
import { OrderDomain } from "./domain/order.domain";
import { Optional } from 'typescript-optional';
import { OrderEntity } from "./repository/entity/order.entity";
import { OrderItemEntity } from "./repository/entity/order_item.entity";
import { OrderItemDomain } from "./domain/order_item.domain";
import ProductMapper from "src/products/product.mapper";

export default class OrderMapper {

    public static toDomain(doc: OrderEntity): Optional<OrderDomain> {

        if (!doc) {
          return Optional.empty<OrderDomain>();
        }

        let domain = new OrderDomain();
        domain._id = doc._id;
        domain.code = doc.code;
        domain.discount = doc.discount;
        domain.items = doc.items.map(orderItemEntity => {

          let orderItem = new OrderItemDomain();
          orderItem.quantity = orderItemEntity.quantity;
          orderItem.item = ProductMapper.toDomain(orderItemEntity.item).get();
          return orderItem;
        });

        return Optional.of(domain);
    }

    public static toDomains(productsEntity: OrderEntity[]): OrderDomain[] {
        return productsEntity.map(productEntity => this.toDomain(productEntity).get());
    }
}