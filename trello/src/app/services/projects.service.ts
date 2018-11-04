
import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { RequestService } from "src/app/services/request.service";
import { ProjectModel } from '../models/project.model';
import { OperationsService } from "src/app/services/operations.service";
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
      .then(response => {
        const projectIndex: number = this.projects.findIndex(
          project => project.id === id
        );
        const copiedProject: ProjectModel = { ...this.projects[projectIndex] };
        copiedProject.name = formData[0].value;
        copiedProject.description = formData[1].value;
        copiedProject.color = formData[2].value;

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
      .then((response: { id: number }) => {
        const creationDate = new Date();
        this.projects.push(
          new ProjectModel(
            addProjectData[0].value,
            response.id,
            [],
            1,
            creationDate,
            addProjectData[1].value,
            "",
            addProjectData[2].value,
            null
          )
        );
        this.lastAddedProjetId = response.id;
        this.onChangeProjects.emit(this.projects);
        this.onChangeLastAddedProjectId.emit(response.id);
      })
      .catch(error => {
        this.onChangeProjects.emit(this.projects);
        this.onChangeLastAddedProjectId.emit(-1);
      });
  };

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
}