import { Component, OnInit } from '@angular/core';
import { PaginationService } from "src/app/services/pagination.service";
import { Input } from "@angular/core";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  pages: number[] = [];
  @Input() startPage: number = -1;
  @Input() items: any[];
  @Input() limit: number;
  
  currentSelectedPage: number = -1;
  
  constructor(private paginationService: PaginationService) {

  }
  ngOnInit() {
    this.paginationService.onPageChange
    .subscribe((page: any) => {
      this.currentSelectedPage = page.selectedPage;
      this.pages = page.pages;
    });

    this.paginationService.createPages(this.items.length, this.limit, this.startPage);
  }

  onChangePage(index: number){
    this.paginationService.changePage(index, this.items.length, this.limit);
  }

  goToNextPage(){
    this.paginationService.changePage(this.currentSelectedPage + 1, this.items.length, this.limit);
  }
  goToPreviousPage(){
    this.paginationService.changePage(this.currentSelectedPage - 1, this.items.length, this.limit);
  }

}
