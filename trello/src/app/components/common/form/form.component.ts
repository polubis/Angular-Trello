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

  constructor(private formService: FormService){

  }
  isFormDirty: boolean = false;
  formStateItems: any[] = [];
  shouldLetUserSubmit: boolean = true;
  
  ngOnInit() {
    this.formStateItems = this.formService.createErrorItems(this.formSettings);
  }


  handleTyping(index: number, e){
    this.formStateItems[index] = this.formService.validate(this.formStateItems[index], e.target.value, 
        this.formSettings[index].validationSettings);
  }


}
