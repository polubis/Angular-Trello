import { Component, OnInit } from '@angular/core';
import { RequestService } from "src/app/services/request.service";
import { Router } from "@angular/router";
import { Project } from '../../models/project.model';
@Component({
  selector: "app-main",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"]
})
export class ProjectsComponent implements OnInit {
  constructor(private requestService: RequestService, private router: Router) {}
  projects: Project[] = [
    { name: "Project with friends", description: "This will be the small project created with friends", img: "assets/guitar.jpg"},
    { name: "Project witdh friends", description: "This will be the small project created with friendds", img: "assets/guitar.jpg"},
  ];
  actualWatchedProject: number = 0;
  isFetchingProjects: boolean = true;


  ngOnInit() {
    this.requestService.executeRequest("projects", "get").then(response => {
      this.isFetchingProjects = false;
    }).catch(error => this.isFetchingProjects = false);
  }


}
