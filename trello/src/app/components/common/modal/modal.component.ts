import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() onClosingModal = new EventEmitter<void>();
  @Input() width: string;
  @Input() height: string;
  @Input() modalTitle: string = "";
  @Input() background: string = "#0588DC";

  constructor() { }

  ngOnInit() {
  }

  closeModal(){
    this.onClosingModal.emit();
  }

}
