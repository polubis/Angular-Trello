
import { Injectable } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { RequestService } from "src/app/services/request.service";
import { ProjectModel } from '../models/project.model';
@Injectable()
export class ProjectsService {
  projects: ProjectModel[] = [];
  currentWatchedProjectId: number = -1;
  lastAddedProjetId: number = -1;

  onChangeLastAddedProjectId = new EventEmitter<number>();
  onChangeCurrentWatchedProjectId = new EventEmitter<number>();
  onChangeProjects = new EventEmitter<ProjectModel[]>();

  constructor(
    private requestService: RequestService
  ) {}

  getProjects() {
    this.requestService
      .executeRequest("projects", "get")
      .then((response: any[]) => {
        this.projects = response;
        this.onChangeProjects.emit(this.projects);
      })
      .catch(() => {
        this.onChangeProjects.emit(this.projects);
      });
  }

  addProject = (addProjectData: any) => {
    this.requestService
      .executeRequest(
        "addProject",
        "post",
        addProjectData,
        "Project has been succesfuly added"
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

  getProjectDetails(id: string){
    this.currentWatchedProjectId = Number(id);
    this.onChangeCurrentWatchedProjectId.emit(Number(id));
    return this.requestService.executeRequest("projectDetails", "get", {}, "", id.toString())
  }
}