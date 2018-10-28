import { Component, OnInit } from '@angular/core';
import { loginFormSettings, registerFormSettings } from '../../constants/constants'; 
import FormModel from '../../models/form.model';
import { RequestService } from '../../services/request.service';
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
  isLoginModalOpen: boolean = false;
  loginFormSettings: FormModel[] = loginFormSettings;
  registerFormSettings: FormModel[] = registerFormSettings;
  isDoingRequest: boolean = false;
  isRegisterModalOpen: boolean = true;

  constructor(private requestService: RequestService) {}
  ngOnInit() {
  }

  togleRegisterModal(){
    this.isRegisterModalOpen = !this.isRegisterModalOpen;
  }

  togleLoginModal(){
    this.isLoginModalOpen = !this.isLoginModalOpen;
  }

  logIn(loginData: any){
    this.isDoingRequest = true;
    this.requestService.executeRequest("login", "post", loginData).then(response => {
      this.isDoingRequest = false;
    }).catch(() => this.isDoingRequest = false)
     
  }

}
