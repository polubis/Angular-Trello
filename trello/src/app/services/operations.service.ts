import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class OperationsService{
    operations: any[] = [];
    operationsChanged = new EventEmitter<any[]>();
    limit: number = 3;

    addOperation(type: string, content: string){
        const currentOperations = [...this.operations];

        if(currentOperations.length > this.limit){
            currentOperations.splice(currentOperations.length-1, 1);
        }
        currentOperations.unshift({type, content});
        this.operations = currentOperations;
        this.operationsChanged.emit(currentOperations);
    }

    removeOperation(index: number){
        this.operations.splice(index, 1);
        this.operationsChanged.emit(this.operations);
    }
}