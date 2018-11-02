
import { RequestService } from "src/app/services/request.service";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TaskModel } from "src/app/models/task.model";


@Injectable()
export class TasksService {
  projectId: number;
  buckets: any = {
    Todo: [],
    InProgress: [],
    Done: [],
  }
  onChangeTasks = new Subject();
  constructor(private requestService: RequestService) {

  }

  setProjectId(projectId: number){
    this.projectId = projectId;
  }

  createBuckets(tasks: any[]): any{
    const buckets: any = {...this.buckets};
    const bucketKeys = Object.keys(buckets).map(key => key.trim().toUpperCase());
    for(let key in tasks){
      bucketKeys.forEach(function(part){
        if(tasks[key].bucket.trim().toUpperCase() === part){
          buckets[tasks[key].bucket].push(tasks[key]);
        }
      })
    }
    return buckets;
  }
  
  getTasksForProject(){
    this.requestService.executeRequest("projectDetails", "get", {}, "",
      this.projectId.toString())
      .then((response: any) => {
        this.buckets = this.createBuckets(response.tasks);
        this.onChangeTasks.next({buckets: this.buckets, labels: response.labels});
      }).catch(error => this.onChangeTasks.next({buckets: this.buckets, labels: []}));
  }

  addTask(formData: any, projectId: number){
    return this.requestService.executeRequest("addTaskToProject", "post", formData, "Task has been succesfully added into project", 
        projectId.toString());
  }

  deleteTask(taskId: number){
    return this.requestService.executeRequest("deleteTaskFromProject", "delete", {}, "Task has been successfuly deleted", taskId.toString())
  }

  editTask(formData: any, taskId: number){
    return this.requestService.executeRequest("editTaskInProject", "put", formData, "Task has been succesfully edited", taskId.toString());
  }

  editColor(payload: any, taskId: number){
    return this.requestService.executeRequest("editTaskColorInProject", "put", payload, "Task color has been successfuly edited", taskId.toString());
  }

  createTasksArrays(allTasks: any[]){
    const categories: string[] = [];


  }
}