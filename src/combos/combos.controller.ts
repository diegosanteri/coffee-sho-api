import { Controller, Get, Post, Put, Delete, Param, Query, DefaultValuePipe, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ComboService } from './combos.service';
import { PaginateQuery } from '../common/paginate.query';
import { ComboDomain } from './domain/combo.domain';
import { ParseSearchPipe } from '../common/pipe/parse_search.pipe';
import { SearchQuery } from '../common/model/search_query';
import { CreateComboDomain } from './domain/create_combo.domain';
import { ApiQuery } from '@nestjs/swagger';

@Controller("combos")
export class CombosController {

  constructor(private readonly comboService: ComboService) {}

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
  async getCombos(
      @Query("_search", new ParseSearchPipe()) search: SearchQuery, 
      @Query("_page", new DefaultValuePipe(1)) page: number, 
      @Query("_limit", new DefaultValuePipe(10)) limit: number): Promise<PaginateQuery<ComboDomain>> {
    return await this.comboService.getCombos(search, page, limit);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("/")
  async createCombo(@Body()combo: CreateComboDomain) : Promise<ComboDomain>{
    return await this.comboService.createCombo(combo);
  }

  @Get("/:id")
  public getComboById(@Param('id') id: string): Promise<ComboDomain> {
    return this.comboService.getComboById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put("/:id")
  public updateCombo(@Param('id') id: string, @Body()combo: CreateComboDomain): Promise<void> {
    return this.comboService.updateCombo(id, combo);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete("/:id")
  public deleteCombo(@Param('id') id: string): Promise<void> {
    return this.comboService.deleteCombo(id);
  }
}
