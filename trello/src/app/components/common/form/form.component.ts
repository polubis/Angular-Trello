import { Component, OnInit, Input } from '@angular/core';
import FormModel from '../../../models/form.model';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formSettings: FormModel[];
  @Input() formClass: string;
  
  formStateItems: any[] = [];

  ngOnInit() {
    this.formStateItems = this.formSettings.map(item => ( { value: "", error: "" } )) ;
    console.log(this.formSettings);
  }

  onChangeInputHandler(index: number, e){
  }




}
