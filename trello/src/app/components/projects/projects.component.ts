import { Component, OnInit } from '@angular/core';
import { RequestService } from "src/app/services/request.service";
import { Router } from "@angular/router";
import { addProjectFormSettings } from '../../constants/constants';
import { ProjectModel } from '../../models/project.model';
import FormModel from '../../models/form.model';
import { OperationsService } from "src/app/services/operations.service";
import { PaginationService } from "src/app/services/pagination.service";
@Component({
  selector: "app-main",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  providers: [PaginationService]
})
export class ProjectsComponent implements OnInit {
  constructor(
    private requestService: RequestService,
    private router: Router,
    private operationsService: OperationsService,
    private paginationService: PaginationService
  ) {}
  projects: ProjectModel[] = [];
  isAddProjectModalOpen: boolean = false;
  actualWatchedProject: number = -1;
  isFetchingProjects: boolean = true;
  addProjectFormSettings: FormModel[] = addProjectFormSettings;
  isAddingProject: boolean = false;
  isSlideChanged: boolean = false;

  leftRange: number = -1;
  rightRange: number = 1;
  limit: number = 5;

  ngOnInit() {
    this.requestService
      .executeRequest("projects", "get")
      .then((response: any[]) => {
        this.projects = response;
        if (this.projects.length > 0) {
          this.actualWatchedProject = this.projects[0].id;
        }
        this.isFetchingProjects = false;
      })
      .catch(error => (this.isFetchingProjects = false));

      this.paginationService.onPageChange
      .subscribe((page: any) => {
        this.leftRange = page.leftRange;
        this.rightRange = page.rightRange;
      });

  }

  changeProject(id: number){
    this.actualWatchedProject = id;
  }

  togleAddProjectModal = () => {
    this.isAddProjectModalOpen = !this.isAddProjectModalOpen;
  };

  addProject = (addProjectData: any[]) => {
    this.isAddingProject = true;
    this.requestService
      .executeRequest(
        "addProject",
        "post",
        addProjectData,
        "Project has been succesfuly added"
      )
      .then((response: { id: number }) => {
        this.projects.push(
          new ProjectModel(
            addProjectData[0].value,
            response.id,
            [],
            1,
            "dasdsad",
            addProjectData[1].value,
            "",
            addProjectData[2].value
          )
        );
        this.isAddingProject = false;
        this.isAddProjectModalOpen = false;
        this.actualWatchedProject = response.id;
        this.paginationService.createPages(this.projects.length, this.limit);
        this.operationsService.removeAllAfterDelay(3000);
      })
      .catch(error => (this.isAddingProject = false));
  };
}
