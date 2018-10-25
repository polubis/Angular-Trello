import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
  }

}
