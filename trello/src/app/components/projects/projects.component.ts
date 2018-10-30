import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { addProjectFormSettings } from '../../constants/constants';
import { ProjectModel } from '../../models/project.model';
import FormModel from '../../models/form.model';
import { OperationsService } from "src/app/services/operations.service";
import { PaginationService } from "src/app/services/pagination.service";
import { ProjectsService } from "src/app/services/projects.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-main",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  providers: [PaginationService]
})
export class ProjectsComponent implements OnInit {
  constructor(
    private router: Router,
    private operationsService: OperationsService,
    private paginationService: PaginationService,
    private projectsService: ProjectsService,
    private activatedRoute: ActivatedRoute
  ) {}
  projects: ProjectModel[] = [];
  isAddProjectModalOpen: boolean = false;
  isFetchingProjects: boolean = true;
  addProjectFormSettings: FormModel[] = addProjectFormSettings;
  isAddingProject: boolean = false;
  isSlideChanged: boolean = false;

  leftRange: number = -1;
  rightRange: number = 1;
  limit: number = 5;

  actualWatchedProject: number = -1;

  ngOnInit() {
    this.projectsService.onChangeProjects.subscribe(
      (projects: ProjectModel[]) => {
        this.projects = projects;
        this.isFetchingProjects = false;
      }
    );

    this.projectsService.onChangeCurrentWatchedProjectId.subscribe((currentWatchedProjectId: number) => {
      this.actualWatchedProject = currentWatchedProjectId;
    })

    this.projectsService.onChangeLastAddedProjectId.subscribe(
      (addedProjectId: number) => {
        this.isAddingProject = false;
        if (addedProjectId !== -1) {
          this.isAddProjectModalOpen = false;
          this.paginationService.createPages(this.projects.length, this.limit);
          this.operationsService.removeAllAfterDelay(3000);
        }
      }
    );

    this.projectsService.getProjects();

    this.paginationService.onPageChange.subscribe((page: any) => {
      this.leftRange = page.leftRange;
      this.rightRange = page.rightRange;
    });
  }

  changeProject(id: number) {
    this.router.navigate(["/projects", id]);
  }

  togleAddProjectModal = () => {
    this.isAddProjectModalOpen = !this.isAddProjectModalOpen;
  };

  addProject = (addProjectData: any[]) => {
    this.isAddingProject = true;
    this.projectsService.addProject(addProjectData);
  };
}
