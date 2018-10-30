import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { OperationsService } from "src/app/services/operations.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss']
})
export class ErrorHandlerComponent implements OnInit, OnDestroy {
  constructor(private operationsService: OperationsService) { }
  @Input() isLoading: boolean;
  @Input() operationName: string;
  @Input() spinnerClasses: string = "spinner spinner-big page-spinner";
  isError: boolean = null;
  subscription: Subscription;
  ngOnInit() {
    this.subscription = this.operationsService.operationsChanged.subscribe((operations: any[]) => {
      this.isError = operations.findIndex(operation => operation.name === this.operationName) !== -1;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
