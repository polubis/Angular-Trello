import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-togler',
  templateUrl: './togler.component.html',
  styleUrls: ['./togler.component.scss']
})
export class ToglerComponent {
  @Input() items: any[];
  @Input() title: string;
  @Input() btnClass: string;

  isOpen: boolean = false;

  togleList(){
    this.isOpen = !this.isOpen;
  }
}
