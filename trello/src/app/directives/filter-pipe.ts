
import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";
import * as _ from 'lodash';
@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], filterBy: string, sortBy: string, sortOrder: string, value: string): any[] {
        let filteredItems = [];
        items.forEach(element => {
            if(element[filterBy].search(value) !== -1){
                filteredItems.push(element);
            }
        });

        return _.sortBy(filteredItems, [sortBy], [sortOrder])
    }
  }  