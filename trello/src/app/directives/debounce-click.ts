import { Directive, EventEmitter, HostListener, OnInit, Output, OnDestroy, Input } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Subscription } from "rxjs";
@Directive({
  selector: "[debounceClick]"
})
export class DebounceClick implements OnInit, OnDestroy {
  @Input() debounceTime = 500;
  ngOnInit() {
      this.subscription = this.clicks
      .pipe(debounceTime(this.debounceTime))
      .subscribe(e => this.debounceClick.emit(e));
  }

  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject(); // Pozwala na wykonywa
  private subscription: Subscription; // Tworzy zmienna odpowiedzialna za przechowywanie referencji do observable zeby potem go usunac

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Usuwa subskrybcje
  }
  @HostListener("click", ["$event"]) // Add event listener na itemku oznaczonym dyrektowa, nizej funkcja, ktora bedzie wykonywana
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  //[debounceTime]="700" debounceClick
}