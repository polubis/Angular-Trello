import { Pipe, PipeTransform } from "@angular/core";
import * as _ from 'lodash';
@Pipe({
  name: "sort",
  pure: false
})
export class SortingPipe implements PipeTransform {
  transform(items: any[], sortBy: string, sortOrder: string): any[] {
    return _.sortBy(items, sortBy, sortOrder);
  }
}