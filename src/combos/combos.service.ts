import { Injectable, PreconditionFailedException, NotFoundException } from '@nestjs/common';
import { PaginateQuery } from 'src/common/paginate.query';
import { ComboDomain } from './domain/combo.domain';
import ComboRepository from './repository/combo.repository';
import { SearchQuery } from 'src/common/model/search_query';
import { CreateComboDomain } from './domain/create_combo.domain';

@Injectable()
export class ComboService {

  constructor(private readonly comboRepository: ComboRepository) {}

  async getCombos(search: SearchQuery, page: number, limit: number): Promise<PaginateQuery<ComboDomain>> {
    return await this.comboRepository.getCombos(search, page, limit);
  }

  async createCombo(combo: CreateComboDomain) : Promise<ComboDomain> {
    let createdCombo = await this.comboRepository.createCombo(combo);
    if(createdCombo.isEmpty()) {
      throw new PreconditionFailedException("Some condition failed while trying to create a combo");
    }
    return createdCombo.get();
  }

  async getComboById(id: string) : Promise<ComboDomain>{
    
    let combo = await this.comboRepository.getComboyId(id);
    if(combo.isEmpty()) {
      throw new NotFoundException(`Combo ${id} not found`);
    }

    return combo.get();
  }

  async updateCombo(id: string, comboUpdate: CreateComboDomain) : Promise<void> {
    let combo = this.getComboById(id);

    Object.keys(combo).filter(key => key !== "_id").forEach(key => {

      if(!comboUpdate[key]) {
        comboUpdate[key] = combo[key];
      }
    });

    await this.comboRepository.updateCombo(id, comboUpdate);

    return;
  }

  async deleteCombo(id: string) : Promise<void> {
    await this.getComboById(id);
    await this.comboRepository.deleteCombo(id);
    return;
  }

  async findCombosByProducts(ids: string[]) : Promise<ComboDomain[]>{

    return await this.comboRepository.findCombosByProducts(ids);
  }
}
