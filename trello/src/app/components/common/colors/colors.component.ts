import { Component, OnInit } from '@angular/core';
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { ColorsService } from "src/app/services/colors.service";
import { Input } from "@angular/core";

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {
  colorsArray: string[] = [];
  constructor(private colorsService: ColorsService) { }
  @Input() isPaleteOpen: boolean;
  @Output() colorChanged = new EventEmitter<string>();
  @Output() onCloseColors = new EventEmitter<void>();
  @Output() onColorSaved = new EventEmitter<string>();
  @Input() isSavingColor: boolean;
  lastSelectedColor: string = "";
  ngOnInit() {
    this.colorsArray = this.colorsService.colorsArray;
  }
  changeColor(color){
    if(!this.isSavingColor){
      this.lastSelectedColor = color;
      this.colorChanged.emit(color);
    }
    
  }
  closeColors(){
    if(!this.isSavingColor){
      this.onCloseColors.emit();
    }      
  }
  saveColor(){
    this.onColorSaved.emit(this.lastSelectedColor);
  }
}
