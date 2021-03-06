import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { addProjectFormSettings, editProjectFormSettings } from '../../constants/constants';
import { ProjectModel } from '../../models/project.model';
import FormModel from '../../models/form.model';
import { OperationsService } from "src/app/services/operations.service";
import { PaginationService } from "src/app/services/pagination.service";
import { ProjectsService } from "src/app/services/projects.service";
import { Subscription } from "rxjs";
import { projectPicturesBasePath } from '../../constants/constants';
@Component({
  selector: "app-main",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
  providers: [PaginationService]
})
export class ProjectsComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private operationsService: OperationsService,
    private paginationService: PaginationService,
    private projectsService: ProjectsService,
  ) {}
  projectPicturesBasePath = projectPicturesBasePath;
  projects: ProjectModel[] = [];
  isAddProjectModalOpen: boolean = false;
  isFetchingProjects: boolean = true;
  addProjectFormSettings: FormModel[] = [...addProjectFormSettings];
  editProjectFormSettings: FormModel[] = [...editProjectFormSettings];

  isAddingProject: boolean = false;
  isDeletingProject: boolean = false;
  isEditingProject: boolean = false;
  projectIdWherePictureIsAdding = -1;
  isEditProjectModalOpen: boolean = false;
  wholePageView = false;

  leftRange: number = -1;
  rightRange: number = 1;
  limit: number = 5;

  actualWatchedProject: number = -1;
  projectIndexInArray: number = -1;

  isOpenCloseProjectConfirmModal: boolean = false;
  isUserSearchedOpen: boolean = false;

  onChangeProjectsSub: Subscription;
  onChangeCurrentWatchedProjectSub: Subscription;
  onChangeLastAddedProjectId: Subscription;
  onPageChange: Subscription;

  ngOnInit() {
    this.onChangeProjectsSub = this.projectsService.onChangeProjects.subscribe(
      (projects: ProjectModel[]) => {
        this.projects = projects;
        this.isFetchingProjects = false;
        if (this.isDeletingProject) this.isDeletingProject = false;
        if (this.isEditingProject) {
          this.isEditingProject = false;
          this.operationsService.removeAllAfterDelay(3000);
        }
      }
    );

    this.onChangeCurrentWatchedProjectSub = this.projectsService.onChangeCurrentWatchedProjectId.subscribe(
      (currentWatchedProjectId: number) => {
        this.actualWatchedProject = currentWatchedProjectId;
        this.projectIndexInArray = this.projects.findIndex(
          project => project.id === currentWatchedProjectId
        );
      }
    );

    this.onChangeLastAddedProjectId = this.projectsService.onChangeLastAddedProjectId.subscribe(
      (addedProjectId: number) => {
        this.isAddingProject = false;
        if (addedProjectId !== -1) {
          this.isAddProjectModalOpen = false;
          this.paginationService.createPages(
            this.projects.length,
            this.limit,
            -1
          );
          this.changeProject(addedProjectId);
          this.operationsService.removeAllAfterDelay(3000);
        }
      }
    );

    this.projectsService.getProjects();

    this.onPageChange = this.paginationService.onPageChange.subscribe(
      (page: any) => {
        this.leftRange = page.leftRange;
        this.rightRange = page.rightRange;
      }
    );
  }

  addContributor(contributorData: any){
    const index = this.projects.findIndex(project => project.id === this.actualWatchedProject);
    this.projects[index].collaborators.push(contributorData);
  }

  changeProject(id: number) {
    this.router.navigate(["/projects", id]);
  }
  togleUserSearcher() {
    this.isUserSearchedOpen = !this.isUserSearchedOpen;
  }
  togleAddProjectModal = () => {
    this.isAddProjectModalOpen = !this.isAddProjectModalOpen;
  };

  addProject = (addProjectData: any[]) => {
    this.isAddingProject = true;
    this.projectsService.addProject(addProjectData);
  };

  closeProject() {
    this.isOpenCloseProjectConfirmModal = false;
    this.isDeletingProject = true;
    this.projectsService.closeProject();
  }

  togleEditProjectModal() {
    let copiedEditFormItems: FormModel[] = [...this.editProjectFormSettings];

    if (!this.isAddProjectModalOpen) {
      const indexOfProject: number = this.projects.findIndex(
        proj => proj.id === this.actualWatchedProject
      );
      copiedEditFormItems[0].initialValue = this.projects[indexOfProject].name;
      copiedEditFormItems[1].initialValue = this.projects[
        indexOfProject
      ].description;
      copiedEditFormItems[2].initialValue = this.projects[indexOfProject].color;
    } else {
      copiedEditFormItems[0].initialValue = null;
      copiedEditFormItems[1].initialValue = null;
      copiedEditFormItems[2].initialValue = null;
    }
    this.editProjectFormSettings = copiedEditFormItems;
    this.isEditProjectModalOpen = !this.isEditProjectModalOpen;
  }

  editProject = (formData: any) => {
    this.isEditingProject = true;
    this.projectsService.editProject(this.actualWatchedProject, formData);
  };

  togleCloseProjectConfirmModal() {
    this.isOpenCloseProjectConfirmModal = !this.isOpenCloseProjectConfirmModal;
  }

  changeProjectPicture(file: any, projectId: number) {
    this.projectIdWherePictureIsAdding = projectId;
    this.projectsService.addPictureToProject(projectId, file, () => this.projectIdWherePictureIsAdding = -1);
  }
  ngOnDestroy() {
    this.onChangeCurrentWatchedProjectSub.unsubscribe();
    this.onChangeProjectsSub.unsubscribe();
    this.onChangeLastAddedProjectId.unsubscribe();
    this.onPageChange.unsubscribe();
  }

  togleWholePageView(){
    this.wholePageView = !this.wholePageView;
  }

  navigateProjectManage(projectId: number) {
    this.router.navigate(['/manage', projectId, 'tasks']);
  }
}
