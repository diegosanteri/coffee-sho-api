import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { SortQuery } from '../model/sort_query';

@Injectable()
export class ParseSortPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if(!value) {
        return new SortQuery({});
    }

    const search = value.split(":");
    if(search.length < 2) {
       throw new BadRequestException("Invalid sort params");
    }

    const filter = {};
    for(let i=0; i < search.length; i = i+2) {
      const key = search[i];
      const value = search[i+1]; 
      if(!key || !value) {
        break;
      }
      filter[key] = value.toLowerCase() == "asc" ? 1 : -1;
    }

    return new SortQuery(filter);
  }
}