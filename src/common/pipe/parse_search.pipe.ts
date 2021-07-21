import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { SearchQuery } from '../model/search_query';

@Injectable()
export class ParseSearchPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    
    if(!value) {
        return new SearchQuery({});
    }

    const search = value.split(":");
    if(search.length < 2) {
       throw new BadRequestException("Invalid search params");
    }

    const filter = {};

    for(let i=0; i < search.length; i = i+2) {

        filter[search[i]] = search[i+1];
    }

    return new SearchQuery(filter);
  }
}