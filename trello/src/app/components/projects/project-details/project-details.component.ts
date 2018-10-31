import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "src/app/services/projects.service";
import { ActivatedRoute } from "@angular/router";
import { ProjectModel } from "src/app/models/project.model";
import { TaskModel } from "src/app/models/task.model";
import { addTaskFormSettings } from '../../../constants/constants';
import FormModel from "src/app/models/form.model";
import { TasksService } from "src/app/services/tasks.service";
@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"]
})
export class ProjectDetailsComponent implements OnInit {
  isLoadingProjectDetails: boolean = false;
  isAddTaskModalOpen: boolean = false;
  isAddingTask: boolean = false;
  addTaskFormSettings: FormModel[] = [...addTaskFormSettings];
  lastAddedTasks: any[] = [
    {
      id: 0,
      content:
        "Adding new person into clients view asd sad sasad asds asdsad sadasdasdsadasd as sas sads as"
    },
    { id: 1, content: "Adding new person into clients view" },
    { id: 2, content: "Adding new person into clients view" },
    { id: 3, content: "Adding new person into clients view" },
    { id: 4, content: "Adding new person into clients view" }
  ];
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
    private tasksService: TasksService
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

  togleAddTaskModal() {
    this.isAddTaskModalOpen = !this.isAddTaskModalOpen;
  }

  addTask = (formData: any) => {
    this.isAddingTask = true;
    this.tasksService.addTask(formData, this.projectsService.currentWatchedProjectId).then((response: TaskModel) => {
      this.project.tasks.push(response);
      this.isAddingTask = false;
    }).catch(error => this.isAddingTask = false);
  };
}
