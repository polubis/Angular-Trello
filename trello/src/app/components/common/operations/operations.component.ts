import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../../../services/operations.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {
  operations: any[] = [];

  constructor(private operationsService: OperationsService) { }

  ngOnInit() {
    this.operationsService.operationsChanged.subscribe((operations: any[]) => { this.operations = operations; });
  }

  closeOperation(index: number){
    this.operationsService.removeOperation(index);
  }

}
