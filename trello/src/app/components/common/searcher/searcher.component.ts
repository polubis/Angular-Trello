import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from "rxjs";
import { debounceTime } from "rxjs/internal/operators/debounceTime";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit, OnDestroy {
  isSearching: boolean = false;
  private typing = new Subject();
  inputValue: string = "";
  constructor(private usersService: UsersService) { }
  subscription: Subscription; 
  results: any[] = [];
  ngOnInit() {
    this.subscription = this.typing.pipe(
      debounceTime(600) 
    ).subscribe((value: string) => {
      this.isSearching = true;
      this.usersService.getUsersByQuery(value).then((response: any[]) => {
        this.results = response;
        this.isSearching = false;
      }).catch((error => {
        this.isSearching = false;
      }))
    })
  }

  startSearch(e){
    if(e.target.value.length > 3){
      this.typing.next(e.target.value);
    }
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
