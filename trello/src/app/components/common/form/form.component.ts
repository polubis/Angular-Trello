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
  ngOnInit() {
    this.formStateItems = this.formService.createFormItems(this.formSettings);
    this.numberOfFormItems = this.formSettings.length;
  }

  handleTyping(index: number, e){
    this.formStateItems[index] = this.formService.validate(this.formStateItems[index], e.target.value, 
      this.formSettings[index].validationSettings);
    this.isFormReadyToSubmit = this.formStateItems.filter(item => item.isAllErrorsResolved).length === this.numberOfFormItems;
    
    if(this.isFormDirty) this.handleCreatingSpecifications();
  }

  fillErrorsOnFocusedInput(index: number){
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
      this.submitMethod(this.formStateItems);
    }
    else{
      this.handleCreatingSpecifications();
    }
  }
}
