import { Component, OnInit } from '@angular/core';
import { loginFormSettings } from '../../constants/constants'; 
import FormModel from '../../models/form.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  toglerItems: any[] = [
    {icon: "info", name: "About"},
    {icon: "phone", name: "Contact"},
    {icon: "highlight", name: "Policy"}
  ]; 
  isLoginModalOpen: boolean = true;
  loginFormSettings: FormModel[] = loginFormSettings;
  ngOnInit() {
  }

  togleLoginModal(){
    this.isLoginModalOpen = !this.isLoginModalOpen;
  }
}
