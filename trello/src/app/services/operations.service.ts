import { Injectable, EventEmitter } from '@angular/core';
import { Router, Event, NavigationEnd} from '@angular/router';

@Injectable()
export class OperationsService{
    operations: any[] = [];
    operationsChanged = new EventEmitter<any[]>();
    limit: number = 3;
    constructor(private router: Router){
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd && this.operations.length > 0) {
                 this.clearAllOperations();
            }
        });
    }

    addOperation(type: string, content: string){
        let currentOperations = [...this.operations];
        if(type === "success"){
            currentOperations = [];
            currentOperations.push({ type, content });
        }
        else{
            if(currentOperations.length > this.limit){
                currentOperations.splice(currentOperations.length-1, 1);
            }
            currentOperations.unshift({type, content});
        }
        
        this.operations = currentOperations;
        this.operationsChanged.emit(currentOperations);
    }

    removeOperation(index: number){
        this.operations.splice(index, 1);
        this.operationsChanged.emit(this.operations);
    }
    
    clearAllOperations(){
        this.operations = [];
        this.operationsChanged.emit(this.operations);
    }

    removeAllAfterDelay(delay: number){
        setTimeout(() => {
            this.clearAllOperations();
        }, delay);
    }
}