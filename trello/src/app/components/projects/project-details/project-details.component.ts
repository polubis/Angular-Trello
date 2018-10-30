import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "src/app/services/projects.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  isLoadingProjectDetails: boolean = true;
  constructor(private projectsService: ProjectsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.isLoadingProjectDetails = true;
      this.projectsService.getProjectDetails(param.id).then(response => {
        this.isLoadingProjectDetails = false;
      }).catch(error => this.isLoadingProjectDetails = false);
    })
  }
  
}
