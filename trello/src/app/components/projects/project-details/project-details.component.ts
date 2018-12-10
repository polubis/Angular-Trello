import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "src/app/services/projects.service";
import { ActivatedRoute } from "@angular/router";
import { ProjectModel } from "src/app/models/project.model";
import FormModel from "src/app/models/form.model";
import { OperationsService } from "src/app/services/operations.service";
import { PaginationService } from "src/app/services/pagination.service";
import { OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { projectPicturesBasePath } from '../../../constants/constants';
@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"]
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  isLoadingProjectDetails: boolean = false;
  isAddTaskModalOpen: boolean = false;
  project: ProjectModel;
  isUserCartOpen: boolean = false;
  routeSubscription: Subscription;
  projectPicturesBasePath = projectPicturesBasePath;
  projectId = '';
  constructor(
    private projectsService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private operationsService: OperationsService,
    private paginationService: PaginationService
  ) {}
  popUpUserDetails(){
    this.isUserCartOpen = true;
  }
  hideUserDetails(){
    this.isUserCartOpen = false;
  }
  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.params["id"];
    const startPageNumber: number = this.paginationService.calculateStartPage(
      this.projectsService.projects,
      "id",
      Number(this.activatedRoute.snapshot.params["id"]),
      this.paginationService.limit
    );
    this.paginationService.changePage(
      startPageNumber,
      this.projectsService.projects.length,
      this.paginationService.limit
    );
    this.routeSubscription = this.activatedRoute.params.subscribe(param => {
      this.projectId = this.activatedRoute.snapshot.params["id"];
      if (this.projectsService.projects.length > 0 && this.projectId) {
        this.getProjects();
      }
    });

    this.projectsService.onChangeProjects.subscribe(projects => {
      if (this.projectId) {
        this.getProjects();
      }
    })
  }

  getProjects() {
    this.isLoadingProjectDetails = true;
    this.projectsService
      .getProjectDetails(this.projectId)
      .then((response: any) => {
        const indexOfProject: number = this.projectsService.projects.findIndex(
          project => project.id === Number(this.projectId)
        );
        const copiedProject: ProjectModel = {
          ...this.projectsService.projects[indexOfProject]
        };
        copiedProject.tasks = response.tasks.filter(task => task.bucket === "todo");
        this.project = copiedProject;
        this.isLoadingProjectDetails = false;
      })
      .catch(error => (this.isLoadingProjectDetails = false));
  }

  ngOnDestroy() {
    this.projectsService.currentWatchedProjectId = -1;
    this.projectsService.onChangeCurrentWatchedProjectId.emit(-1);
    this.routeSubscription.unsubscribe();
  }
}
