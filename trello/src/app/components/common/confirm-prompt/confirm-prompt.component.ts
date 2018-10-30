import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-prompt',
  templateUrl: './confirm-prompt.component.html',
  styleUrls: ['./confirm-prompt.component.scss']
})
export class ConfirmPromptComponent implements OnInit {
  @Input() btnTitle: string = "Confirm";
  @Input() icon: string;
  @Input() header: string;
  @Input() subHeader: string;
  @Input() operationBtnClass: string = "circle-btn";
  @Input() denyBtnClass: string = "label-btn";
  @Output() onClosingPrompt = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  confirm(){
    this.onConfirm.emit();
  }

  closePrompt(){
    this.onClosingPrompt.emit();
  }

}
