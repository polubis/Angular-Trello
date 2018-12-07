import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-file-picker',
  templateUrl: './file-picker.component.html',
  styleUrls: ['./file-picker.component.scss']
})
export class FilePickerComponent implements OnInit {
  @ViewChild('inputRef') inputRef: ElementRef;
  @ViewChild('imgRef') imgRef: ElementRef;
  @Input() classes = '';
  @Input() shouldShowAddedImage = true;
  @Input() btnClass = 'add-file-btn';
  @Output() addingFile = new EventEmitter<any>();

  selectedFile: any;
  constructor() { }

  ngOnInit() {
  }
  addFile(event) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imgRef.nativeElement.src = reader.result;
      this.selectedFile = event.target.files[0];
    }
    reader.readAsDataURL(event.target.files[0]);

    this.addingFile.emit(event.target.files[0]);
  }
  openAddingFile() {
    this.inputRef.nativeElement.click();
  }

}
