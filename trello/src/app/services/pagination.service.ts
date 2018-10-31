
import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class PaginationService {
  currentSelectedPage: number = -1;
  pages: number[] = [];
  leftRange: number = -1;
  rightRange: number = -1;
  limit: number = -1;
  onPageChange = new EventEmitter<any>();

  createPagesSchema(numberOfAllItems: number, limit: number){
    const pages: number[] = [];
    const numberOfPagesToCreate: number = Math.ceil(numberOfAllItems/limit);
    for(let i = 0; i < numberOfPagesToCreate; i++)
      pages.push(i+1);
    return pages;
  }

  createPages(numberOfAllItems: number, limit: number, startPage: number){
      const pages = this.createPagesSchema(numberOfAllItems, limit);
      if(pages.length > 0){
        this.pages = pages;
        const currentSelectedPage = startPage === -1 ? pages.length : startPage;
        this.limit = limit;
        const ranges = this.calculateRanges(numberOfAllItems, limit, currentSelectedPage);
        this.onPageChange.emit({selectedPage: currentSelectedPage, leftRange: ranges.leftRange, rightRange: ranges.rightRange, pages: pages});
      }
  }

  calculateRanges(numberOfAllItems: number, limit: number, currentSelectedPage: number): any{
    const leftRange: number = (currentSelectedPage - 1) * limit;
    const rightRange: number = currentSelectedPage * limit;
    return { leftRange, rightRange };
  }

  changePage(index: number, numberOfAllItems: number, limit: number){
    this.currentSelectedPage = index;
    const ranges = this.calculateRanges(numberOfAllItems, limit, index);
    this.leftRange = ranges.leftRange;
    this.rightRange = ranges.rightRange;
    this.pages = this.createPagesSchema(numberOfAllItems, limit);
    this.onPageChange.emit({selectedPage: index, leftRange: this.leftRange, rightRange: this.rightRange, pages: this.pages});
  }

  calculateStartPage(items: any[], key: string, valueToIdentify: any, limit: number): number{
    const indexOfElement = items.findIndex(item => item[key] === valueToIdentify); // mam indeks obiektu w tablicy
    return indexOfElement === -1 ? -1 : Math.ceil((indexOfElement+1) / limit);
  }


}