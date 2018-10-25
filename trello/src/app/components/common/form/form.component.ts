import { Component, OnInit, Input } from '@angular/core';
import FormModel from '../../../models/form.model';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formItems: FormModel[];
  formStateItems: any[] = [];

  ngOnInit() {
    this.formStateItems = this.formItems.map(item => ( { value: "", error: "" } )) ;
  }

  onChangeInputHandler(index: number, e){
    console.log(e.target.value);
  }




}
