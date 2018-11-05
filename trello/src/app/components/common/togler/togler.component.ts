import { Component, Input, EventEmitter } from '@angular/core';
import { Output } from "@angular/core";

@Component({
  selector: 'app-togler',
  templateUrl: './togler.component.html',
  styleUrls: ['./togler.component.scss']
})
export class ToglerComponent {
  @Input() items: any[];
  @Input() title: string;
  @Input() btnClass: string;
  @Output() onSelectItem = new EventEmitter<any>();
  isOpen: boolean = false;

  togleList(){
    this.isOpen = !this.isOpen;
  }

  selectItem(item){
    this.onSelectItem.emit(item);
  }
}
