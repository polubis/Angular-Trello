


import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class LengthPipe implements PipeTransform {
  transform(value: string, limit: number) {
    if (value.length > limit) {
      return value.substring(0, limit) + "...";
    }
    return value;
  }
}