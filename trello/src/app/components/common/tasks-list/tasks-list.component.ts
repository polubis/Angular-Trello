import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskModel } from "src/app/models/task.model";
import { Input } from "@angular/core";
import { addTaskFormSettings } from '../../../constants/constants';
import FormModel from "src/app/models/form.model";
import { TasksService } from "src/app/services/tasks.service";
import { ProjectsService } from "src/app/services/projects.service";
import { OperationsService } from "src/app/services/operations.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {
  @Input() items: TaskModel[];
  @Input() limit: number;

  isSavingTaskColor: boolean = false;
  currentOpenedColorsIndex: number = -1;
  isDeleteTaskPromptOpen: boolean = false;
  isEditTaskModalOpen: boolean = false;
  isEditingTask: boolean = false;
  isDeletingTask: boolean = false;
  isAddingTask: boolean = false;
  isAddTaskModalOpen: boolean = false;
  editTaskFormSettings: FormModel[] = [...addTaskFormSettings];
  addTaskFormSettings: FormModel[] = [...addTaskFormSettings];

  taskToChange: number = -1;
  constructor(private tasksService: TasksService, private projectsService: ProjectsService, 
    private operationsService: OperationsService, private activatedRoute: ActivatedRoute) { }

  private subscription: Subscription; 

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(param => {
      if(this.currentOpenedColorsIndex !== -1)
        this.currentOpenedColorsIndex = -1;
    })
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  saveTaskColor = (color: string) => {
    const name: string = this.items[this.currentOpenedColorsIndex].name;
    const description: string = this.items[this.currentOpenedColorsIndex].description;
    this.isSavingTaskColor = true;
    this.tasksService.editColor({name, description, color}, this.items[this.currentOpenedColorsIndex].id)
    .then((response: any) => {
      this.isSavingTaskColor = false;
      this.currentOpenedColorsIndex = -1;
    }).catch(error => this.isSavingTaskColor = false);
  }

  togleColorPalette(index: number){
    this.currentOpenedColorsIndex = this.currentOpenedColorsIndex !== index ? index : -1;
  }

  changeTaskColor(color: string, index: number){
    this.items[index].color = color;
  }

  deleteTask(){
    this.isDeleteTaskPromptOpen = false;
    this.isDeletingTask = true;
    this.tasksService.deleteTask(this.items[this.taskToChange].id).then((response: any) => {
      this.items.splice(this.taskToChange, 1);
      this.isDeletingTask = false;
      this.operationsService.removeAllAfterDelay(3000);
    }).catch(error => this.isDeletingTask = false);
  }

  editTask = (formData: any) => {
    this.isEditingTask = true;
    this.tasksService.editTask(formData, this.items[this.taskToChange].id).then((response: TaskModel) => {
      const copiedItem = {...this.items[this.taskToChange]};
      copiedItem.name = formData[0].value;
      copiedItem.description = formData[1].value;
      copiedItem.color = formData[2].value;
      this.items[this.taskToChange] = copiedItem;
      this.isEditingTask = false;
      this.operationsService.removeAllAfterDelay(3000);
      
    }).catch((error) => this.isEditingTask = false);

  }
  togleEditTaskModal(index: number){
    const copiedEditFormSettings: FormModel[] = [...this.editTaskFormSettings];
    
    if(!this.isEditTaskModalOpen){
      copiedEditFormSettings[0].initialValue = this.items[index].name;
      copiedEditFormSettings[1].initialValue = this.items[index].description;
      copiedEditFormSettings[2].initialValue = this.items[index].color;
      this.editTaskFormSettings = copiedEditFormSettings;
      this.taskToChange = index;
    }
    else{
      copiedEditFormSettings[0].initialValue = null;
      copiedEditFormSettings[1].initialValue = null;
      copiedEditFormSettings[2].initialValue = null;
    }

    this.isEditTaskModalOpen = !this.isEditTaskModalOpen;
  }
  togleDeleteTaskPrompt(index: number){
    this.taskToChange = index;
    this.isDeleteTaskPromptOpen = !this.isDeleteTaskPromptOpen;
  }

  togleAddTaskModal(){
    this.isAddTaskModalOpen = !this.isAddTaskModalOpen;
  }

  addTask = (formData: any) => {
    this.isAddingTask = true;
    this.tasksService
      .addTask(formData, this.projectsService.currentWatchedProjectId)
      .then((response: TaskModel) => {
        this.items.push(response);
        this.isAddingTask = false;
        this.operationsService.removeAllAfterDelay(3000);
      })
      .catch(error => (this.isAddingTask = false));
  };
}
