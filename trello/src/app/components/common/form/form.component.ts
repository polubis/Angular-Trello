import { Component, OnInit, Input } from '@angular/core';
import FormModel from '../../../models/form.model';
import { FormService } from '../../../services/form.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formSettings: FormModel[];
  @Input() formClass: string;
  @Input() submitMethod: Function;
  @Input() isDoingRequest: boolean;
  @Input() submitButtonTitle: string = "Confirm";

  constructor(private formService: FormService){}
  formStateItems: any[] = [];
  currentFocusedInput: number = -1;
  showListWithErrorsCounters: boolean = false;
  numberOfFormItems: number = 0;
  isFormReadyToSubmit: boolean = true;
  isFormDirty: boolean = false;
  shouldShowErrorsSpecifications: boolean = false;
  errorsSpecifications: any[] = [];
  currentOpenedColorsIndex: number = -1;
  currentOpenedIconPalete: number = -1;
  currentOpenedListIndex: number = -1;
  ngOnInit() {
    this.formStateItems = this.formService.createFormItems(this.formSettings);
    this.numberOfFormItems = this.formSettings.length;
  }
  togleIconPalete(index: number){
    this.currentOpenedIconPalete = this.currentOpenedIconPalete === index ? -1 : index;
    if(this.currentOpenedColorsIndex !== -1)
      this.currentOpenedColorsIndex = -1;
  }

  togleColorPalete(index: number){
    this.currentOpenedColorsIndex = this.currentOpenedColorsIndex === index ? -1 : index;
    if(this.currentOpenedIconPalete !== -1)
      this.currentOpenedIconPalete = -1;
  }
  changeColor(color: string, index: number){
    this.handleValueSetting(index, color);
  }

  addListElementIntoInputValue(item: any, index: number){
    this.handleValueSetting(index, item.id);
    this.currentOpenedListIndex = -1;
  }
  handleTypingWithList(index: number, e){
    this.handleValueSetting(index, e.target.value);
    if(this.formStateItems[index].isAllErrorsResolved){
      this.currentOpenedListIndex = index;
    }
  }

  changeIcon(icon: string, index: number){
    this.handleValueSetting(index, icon);
  }
  handleValueSetting(index: number, value: any){
    this.formStateItems[index] = this.formService.validate(this.formStateItems[index], value,
      this.formSettings[index].validationSettings);

    this.isFormReadyToSubmit = this.formStateItems.filter(item => item.isAllErrorsResolved).length === this.numberOfFormItems;
    if(this.isFormDirty) this.handleCreatingSpecifications();
  }
  handleTyping(index: number, e){
    this.handleValueSetting(index, e.target.value);
  }
  handleTypingWithoutEvent(data: any, index: number) {
    this.handleValueSetting(index, data);
  }

  fillErrorsOnFocusedInput(index: number){
    if(this.currentOpenedColorsIndex !== -1) this.currentOpenedColorsIndex = -1;
    if(this.currentOpenedIconPalete !== -1) this.currentOpenedIconPalete = -1;

    this.currentFocusedInput = index;
    this.showListWithErrorsCounters = false;
  }

  removeErrorList(){
    this.currentFocusedInput = -1;
    this.showListWithErrorsCounters = false;
  }

  showErrorsOnClick(){
    this.currentFocusedInput = -1;
    this.showListWithErrorsCounters = true;
  }

  createSpecifications(){
    let specifications = [];
    this.formStateItems.forEach(function(part, index){
      if(!part.isAllErrorsResolved)
        specifications.push({ index, numberOfErrors: part.contents.filter(content => content.isError).length })
    });

    return specifications;
  }

  handleCreatingSpecifications(){
    if(!this.isFormReadyToSubmit){
      this.shouldShowErrorsSpecifications = true;
      this.errorsSpecifications = this.createSpecifications();
    }
    else{
      this.shouldShowErrorsSpecifications = false;
      this.errorsSpecifications = [];
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.formStateItems = this.formService.validateAll(this.formStateItems, this.formSettings);
    this.isFormReadyToSubmit = this.formStateItems.filter(item => item.isAllErrorsResolved).length === this.numberOfFormItems;
    this.currentFocusedInput = this.formStateItems.findIndex(item => !item.isAllErrorsResolved);
    if(!this.isFormDirty) this.isFormDirty = true;

    if(this.isFormReadyToSubmit){
      if(this.currentOpenedColorsIndex !== -1)
        this.currentOpenedColorsIndex = -1;

      this.submitMethod(this.formStateItems);
    }
    else{
      this.handleCreatingSpecifications();
    }
  }

}
