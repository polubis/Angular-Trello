import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "src/app/services/projects.service";
import { ActivatedRoute } from "@angular/router";
import { ProjectModel } from "src/app/models/project.model";
import FormModel from "src/app/models/form.model";
import { OperationsService } from "src/app/services/operations.service";
@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"]
})
export class ProjectDetailsComponent implements OnInit {
  isLoadingProjectDetails: boolean = false;
  isAddTaskModalOpen: boolean = false;
  project: ProjectModel;
  contributors: any[] = [
    { img: "assets/guitar.jpg", sex: "male" },
    { img: "assets/guitar.jpg", sex: "male" },
    { img: "assets/guitar.jpg", sex: "male" },
    { img: "assets/guitar.jpg", sex: "male" },
    { img: null, sex: "male" },
    { img: null, sex: "male" },
    { img: null, sex: "male" },
    { img: null, sex: "male" }
  ];

  constructor(
    private projectsService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private operationsService: OperationsService
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if (this.projectsService.projects.length > 0) {
        this.isLoadingProjectDetails = true;
        this.projectsService
          .getProjectDetails(param.id)
          .then((response: any) => {
            const indexOfProject: number = this.projectsService.projects.findIndex(
              project => project.id === Number(param.id)
            );
            const copiedProject: ProjectModel = {
              ...this.projectsService.projects[indexOfProject]
            };
            copiedProject.tasks = response.tasks;
            this.project = copiedProject;
            this.isLoadingProjectDetails = false;
          })
          .catch(error => (this.isLoadingProjectDetails = false));
      }
    });
  }
}
