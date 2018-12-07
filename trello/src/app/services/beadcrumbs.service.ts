import { ActivatedRoute } from "@angular/router";
import { OnInit, Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";


@Injectable({providedIn: "root"})
export class BreadCrumbsService implements OnInit, OnDestroy {
  currentBreadCrubs = new BehaviorSubject<any>(document.location.pathname);
  subscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe((path: any) => {
      this.currentBreadCrubs.next(document.location.pathname);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
