
import { RequestService } from "src/app/services/request.service";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TaskModel } from "src/app/models/task.model";
import * as _ from 'lodash';


@Injectable()
export class TasksService {
  projectId: number;
  buckets: any = {
    Todo: [],
    InProgress: [],
    Done: [],
  }
  bucketIndexes: any = {
    Todo: "0", InProgress: "1", Done: "2"
  }
  onChangeTasks = new Subject();
  constructor(private requestService: RequestService) {

  }

  moveTaskIntoOtherBoard(payload: any, taskId: number){
    return this.requestService.executeRequest("moveTask", "put", payload, "", taskId.toString(), {});
  }

  setProjectId(projectId: number){
    this.projectId = projectId;
  }

  createBuckets(tasks: any[]): any{
    const buckets: any = {
      Todo: [],
      InProgress: [],
      Done: [],
    };
    const indexesKeys = Object.keys(this.bucketIndexes);
    for(let key in tasks){
      indexesKeys.forEach(element => {
        if(tasks[key].bucket === this.bucketIndexes[element]){
          buckets[element].push(tasks[key]);
        }
      });
    }
    return buckets;
  }
  
  getTasksForProject(){
    this.requestService.executeRequest("projectDetails", "get", {}, "",
      this.projectId.toString(), {})
      .then((response: any) => {
        this.buckets = this.createBuckets(response.tasks);
        this.onChangeTasks.next({buckets: this.buckets, labels: response.labels});
      }).catch(error => this.onChangeTasks.next({buckets: this.buckets, labels: []}));
  }

  addTask(formData: any, projectId: number, objectToSpread: any){
    return this.requestService.executeRequest("addTaskToProject", "post", formData, "Task has been succesfully added into project", 
        projectId.toString(), objectToSpread);
  }

  deleteTask(taskId: number){
    return this.requestService.executeRequest("deleteTaskFromProject", "delete", {}, "Task has been successfuly deleted", taskId.toString(), {})
  }

  editTask(formData: any, taskId: number, objectToSpread: any){
    return this.requestService.executeRequest("editTaskInProject", "put", formData, "Task has been succesfully edited", taskId.toString(), objectToSpread);
  }

  editColor(payload: any, taskId: number){
    return this.requestService.executeRequest("editTaskColorInProject", "put", payload, 
      "Task color has been successfuly edited", taskId.toString(), {});
  }

  assignPersonToTask = (formData: any, projectId: number) => {
    return this.requestService.executeRequest("assignTaskToPerson", "put", formData, "Task has been succesfully assigned", 
      projectId.toString() + "/AssignPersonToTask", {});
  }
}