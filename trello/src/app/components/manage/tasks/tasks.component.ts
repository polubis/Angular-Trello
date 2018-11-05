import { Component, OnInit, OnDestroy } from '@angular/core';
import { TasksService } from "src/app/services/tasks.service";
import { Input } from "@angular/core";
import { TaskModel } from "src/app/models/task.model";
import FormModel from "src/app/models/form.model";
import { labelFormSettings } from '../../../constants/constants';
import { Subscription } from "rxjs";
import { ProjectsService } from "src/app/services/projects.service";
import { ProjectModel } from "src/app/models/project.model";
import { OperationsService } from "src/app/services/operations.service";
@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent implements OnInit, OnDestroy {
  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private operationsService: OperationsService
  ) {}
  labelIdToEdit: number = -1;
  isEditingLabel: boolean = false;
  labelIdToDelete: number = -1;
  isDeletingLabel: boolean = false;

  bucketsNames: string[] = ["To do", "In Progress", "Done"];
  bucketsListsKeys: string[] = [];
  buckets: any = null;
  isDownloadingTasks: boolean = true;
  projectId: number;
  isAddLabelModalOpen: boolean = false;
  isAddingLabel: boolean = false;
  addLabelFormSettings: FormModel[] = [...labelFormSettings];
  editLabelFormSettings: FormModel[] = [...labelFormSettings];
  projectLabels: { name: string; color: string; icon: string, id: number }[] = [];

  tasksSubscription: Subscription;

  togleEditLabelModal(label: { name: string; color: string; icon: string, id: number }){
    const copiedEditLabelSettings: FormModel[] = [...this.editLabelFormSettings];
    if(this.labelIdToEdit === -1){
      copiedEditLabelSettings[0].initialValue = label.name;
      copiedEditLabelSettings[1].initialValue = label.color;
      copiedEditLabelSettings[2].initialValue = label.icon;
    }
    else{
      copiedEditLabelSettings[0].initialValue = null;
      copiedEditLabelSettings[1].initialValue = null;
      copiedEditLabelSettings[2].initialValue = null;
    }
    this.editLabelFormSettings = copiedEditLabelSettings;
    this.labelIdToEdit = this.labelIdToEdit !== -1 ? -1 : label.id;
  }

  togleDeleteLabelModal(id: number){
    this.labelIdToDelete = this.labelIdToDelete === -1 ? id : -1;
  }

  deleteLabel(){
    this.isDeletingLabel = true;
    this.projectsService.deleteLabel(this.labelIdToDelete)
    .then((response: any) => {
      const indexOfDeletedLabel = this.projectLabels.findIndex(label => label.id === this.labelIdToDelete);
      this.projectLabels.splice(indexOfDeletedLabel, 1);      
      this.isDeletingLabel = false;
      this.labelIdToDelete = -1;
      this.operationsService.removeAllAfterDelay(3000);
    }).catch(error => this.isDeletingLabel = false);
  }

  ngOnInit() {
    this.tasksSubscription = this.tasksService.onChangeTasks.subscribe(
      (project: any) => {
        if (this.isDownloadingTasks) this.isDownloadingTasks = false;
        this.buckets = project.buckets;
        this.projectLabels = project.labels;
        this.bucketsListsKeys = Object.keys(project.buckets);
      }
    );

    this.tasksService.getTasksForProject();
    this.projectId = this.tasksService.projectId;
  }

  togleAddLabelModal() {
    this.isAddLabelModalOpen = !this.isAddLabelModalOpen;
  }

  addLabel = (formData: any) => {
    this.isAddingLabel = true;
    this.projectsService
      .addLabelIntoProject(this.tasksService.projectId, formData)
      .then((response: {name: string, icon: string, color: string, id: number}) => {
        this.isAddingLabel = false;
        this.projectLabels.push(response);
        this.operationsService.removeAllAfterDelay(3000);
      })
      .catch(error => (this.isAddingLabel = false));
  };

  editLabel = (formData: any) => {
    this.isEditingLabel = true;
    this.projectsService.editLabelInProject(this.labelIdToEdit, formData)
    .then((response) => {
      const indexOfEditedLabel: number = this.projectLabels.findIndex(label => label.id === this.labelIdToEdit);
      const label = {name: formData[0].value, color: formData[1].value, icon: formData[2].value, id: this.labelIdToEdit };
      this.projectLabels[indexOfEditedLabel] = label;
      this.isEditingLabel = false;
      this.operationsService.removeAllAfterDelay(3000);
    }).catch(error => this.isEditingLabel = false);
  }

  moveTaskIntoAnotherBoard(eventData: any){
    const task: TaskModel = {...eventData.eventData};
    const bucket: string = eventData.bucket;
    this.tasksService.getTasksForProject();

  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }
}
