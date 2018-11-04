import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
 
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
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
    this.subscription = this.typing
    .debounceTime(500).distinctUntilChanged()
    .subscribe((value: string) => {
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
    if(e.target.value.length > 1){
      this.typing.next(e.target.value);
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
