import { Component, OnInit, OnChanges, Input, SimpleChanges, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Moment } from "moment";
import { Subject, interval, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Timer } from "src/app/components/common/timer/timer";
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent extends Timer implements OnInit, OnChanges, OnDestroy {
  @Input() initialTime: string;
  @Input() timerState: string;

  timeObservable = interval(1000 * 60).pipe(map(time => {
    return this.getNewTime();
  }));
  timeAsNumber: number;
  time: string;
  subscription: Subscription;
  constructor() {
    super();
  }

  ngOnInit() {
    this.timeAsNumber = Number(this.initialTime);
    this.time = super.getTimerFormat(this.timeAsNumber);
    this.toggleTimer();
  }

  toggleTimer () {
    if (this.timerState === 'STOP') {
      this.subscription = this.timeObservable.subscribe(time => {
        this.timeAsNumber = this.timeAsNumber + 1;
        this.time = super.getTimerFormat(this.timeAsNumber);
      });
    } else if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.timerState.currentValue !== simpleChanges.timerState.previousValue
      && simpleChanges.timerState.currentValue === 'START') {
        if(this.subscription) this.subscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  getNewTime () {
    return moment(this.time).format('hh-mm-ss');
  }
}
