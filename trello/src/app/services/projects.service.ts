
import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { RequestService } from "src/app/services/request.service";
import { ProjectModel } from '../models/project.model';
import { OperationsService } from "src/app/services/operations.service";
import { fromPromise } from "rxjs/internal-compatibility";
@Injectable()
export class ProjectsService {
  projects: ProjectModel[] = [];
  currentWatchedProjectId: number = -1;
  lastAddedProjetId: number = -1;

  onChangeLastAddedProjectId = new EventEmitter<number>();
  onChangeCurrentWatchedProjectId = new EventEmitter<number>();
  onChangeProjects = new EventEmitter<ProjectModel[]>();

  constructor(
    private requestService: RequestService,
    private operationsService: OperationsService
  ) {}

  editProject(id: number, formData: any) {
    this.requestService
      .executeRequest(
        "editProject",
        "put",
        formData,
        "Project has been succesfully edited",
        id.toString(), {}
      )
      .then((response: ProjectModel) => {
        const projectIndex: number = this.projects.findIndex(
          project => project.id === id
        );
        const copiedProject: ProjectModel = { ...this.projects[projectIndex] };
        copiedProject.name = formData[0].value;
        copiedProject.description = formData[1].value;
        copiedProject.color = formData[2].value;
        copiedProject.picturePath = response.picturePath;

        this.projects[projectIndex] = copiedProject;
        this.onChangeProjects.emit(this.projects);
      })
      .catch(error => {
        this.onChangeProjects.emit(this.projects);
      });
  }

  getProjects() {
    this.requestService
      .executeRequest("projects", "get", {}, "", "", {})
      .then((response: any[]) => {
        this.projects = response;
        this.onChangeProjects.emit(this.projects);
      })
      .catch(() => {
        this.onChangeProjects.emit(this.projects);
      });
  }

  closeProject() {
    this.requestService
      .executeRequest(
        "closeProject",
        "put",
        {},
        "Project has been succesfully closed",
        this.currentWatchedProjectId.toString(), {}
      )
      .then((response: any) => {
        const closeDate = new Date();
        const indexOfCloseProject = this.projects.findIndex(
          i => i.id === this.currentWatchedProjectId
        );
        this.projects[indexOfCloseProject].closingDate = closeDate;
        this.operationsService.removeAllAfterDelay(3000);
        this.onChangeProjects.emit(this.projects);
      })
      .catch(error => {
        this.onChangeProjects.emit(this.projects);
      });
  }

  addLabelIntoProject(projectId: number, formData: any) {
    return this.requestService.executeRequest(
      "addLabelIntoProject",
      "post",
      formData,
      "Label has been succesfully added into project",
      projectId.toString(), {}
    );
  }

  editLabelInProject(labelId: number, formData: any){
    return this.requestService.executeRequest(
      "editLabelInProject",
      "put",
      formData,
      "Label has been succesfully edited project",
      labelId.toString(), {}
    );
  }

  deleteLabel(labelId: number){
    return this.requestService.executeRequest("deleteLabel", "delete", {}, "Label has been succesfully deleted", labelId.toString(), {});
  }

  addProject = (addProjectData: any) => {
    this.requestService
      .executeRequest(
        "addProject",
        "post",
        addProjectData,
        "Project has been succesfuly added", "", {}
      )
      .then((newProject: ProjectModel) => {
        this.lastAddedProjetId = newProject.id;
        const projects = [...this.projects];
        projects.push(newProject);
        this.projects = projects;
        this.onChangeProjects.emit(this.projects);
        this.onChangeLastAddedProjectId.emit(newProject.id);
      })
      .catch(error => {
        this.onChangeProjects.emit(this.projects);
        this.onChangeLastAddedProjectId.emit(-1);
      });
  };

  addPictureToProject(projectId: number, model: any, callBackFunction: any) {
    this.requestService.executeRequest('addProjectPicture', 'put', [{value: model}], '', projectId.toString(), {})
    .then((response: {picturePath: string}) => {
      const projects = [...this.projects];
      const indexOfProject = projects.findIndex(project => project.id === projectId);
      projects[indexOfProject].picturePath = response.picturePath;
      this.projects = projects;
      if (this.currentWatchedProjectId === projects[indexOfProject].id) {
        this.onChangeProjects.emit(this.projects);
      }
      callBackFunction();
    }).catch(error => callBackFunction());
  }


  getProjectDetails(id: string) {
    this.currentWatchedProjectId = Number(id);
    this.onChangeCurrentWatchedProjectId.emit(Number(id));
    return this.requestService.executeRequest(
      "projectDetails",
      "get",
      {},
      "",
      id.toString(), {}
    );
  }

  addPersonToProject(payload: any){
    return this.requestService.executeRequest("addPersonToProject", "post", payload, "Person has been succesfully added into project", "", {});
  }

  removePersonFromProject(userId: any, projectId: any) {
    const queryString = `?userId=${userId}&projectId=${projectId}`;
    return this.requestService.executeRequest("removePersonFromProject", "delete", {},
      "Person has been succesfully removed from project", queryString, {});
  }
}
