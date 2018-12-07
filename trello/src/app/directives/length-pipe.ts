


import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class LengthPipe implements PipeTransform {
  transform(value: any, limit: number) {
    if(value) {
      if (value.length > limit) {
        return value.substring(0, limit) + "...";
      }
      else{
        return value;
      }
    } else {
      return 'this record is not populated...';
    }

  }
}
