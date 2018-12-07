import { Component, OnInit, OnChanges } from '@angular/core';
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { ColorsService } from "src/app/services/colors.service";
import { Input } from "@angular/core";
import { SimpleChanges } from "@angular/core";
import { IconsService } from "src/app/services/icons.service";

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit, OnChanges {
  items: string[] = [];
  constructor(private colorsService: ColorsService, private iconsService: IconsService) { }
  @Input() isSelectingIcons: boolean = false;
  @Input() pickerIcon: string = "color_lens";
  @Input() isPaleteOpen: boolean;
  @Input() shouldHaveSaveButton: boolean = true;
  @Input() shouldIconBeColored: boolean = false;
  @Input() initialColorIcon: string = "white";
  @Input() operationTitle: string = "Save color";

  @Output() itemChanged = new EventEmitter<string>();
  @Output() onCloseItems = new EventEmitter<void>();
  @Output() onSavedItem = new EventEmitter<string>();
  @Input() isSavingItem: boolean;
  lastSelectedItem: string = "";
  ngOnInit() {
    this.items = this.isSelectingIcons ? this.iconsService.icons : this.colorsService.colorsArray;
  }
  ngOnChanges(changes: SimpleChanges){
    if(!changes.currentValue)
      this.lastSelectedItem = "";
  }

  changeItem(item){
    if(!this.isSavingItem){
      this.lastSelectedItem = item;
      this.itemChanged.emit(item);
    }
  }
  closePicker(){
    if(!this.isSavingItem){
      this.onCloseItems.emit();
    }
  }
  saveItem(){
    this.onSavedItem.emit(this.lastSelectedItem);
  }
}
