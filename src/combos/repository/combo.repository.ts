import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PaginateModel } from "mongoose";
import { ComboEntity } from "./entity/combo.entity";
import { ComboDomain } from "../domain/combo.domain";
import { PaginateQuery } from "src/common/paginate.query";
import { SearchQuery } from "src/common/model/search_query";
import { CreateComboDomain } from "../domain/create_combo.domain";
import ComboMapper from "../combo.mapper";
import { Optional } from "typescript-optional";

@Injectable()
export default class ComboRepository {

    constructor(
        @InjectModel('Combo') private readonly comboModel: PaginateModel<ComboEntity>,
    ) {}
    
    async getCombos(search: SearchQuery, page: number, limit: number): Promise<PaginateQuery<ComboDomain>> {

        let response = new PaginateQuery<ComboDomain>();
        const comboResponse = await this.comboModel.paginate(search.filter, {page, perPage: limit});

        response.limit = limit;
        response.page = comboResponse.pagination.page;
        response.docs =  ComboMapper.toDomains(comboResponse.data);

        return response;
    }

    async createCombo(createCombo: CreateComboDomain) : Promise<Optional<ComboDomain>> {

        let createdCombo = new this.comboModel(createCombo);
        createdCombo = await createdCombo.save();
        return ComboMapper.toDomain(createdCombo);
    }

    async updateCombo(_id: string, combo: CreateComboDomain) : Promise<void> {

        await this.comboModel.updateOne({_id}, {$set: combo});

       return;
    }

    async getComboyId(comboId: string) : Promise<Optional<ComboDomain>> {

        let comboCreated = await this.comboModel.findOne({_id: comboId});
        return ComboMapper.toDomain(comboCreated);
    }

    async deleteCombo(comboId: string) : Promise<void>{

        await this.comboModel.deleteOne({_id: comboId});
        return;
    }

    async findCombosByProducts(ids: string[]) : Promise<ComboDomain[]>{

        return ComboMapper.toDomains(
            await this.comboModel.find({
                $and: [{productIds: {$all: ids}}, {productIds: { $size: ids.length }}]
            }).sort( { discountPercentage: 1 } ));
    }
}