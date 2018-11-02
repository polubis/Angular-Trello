

import { RequestService } from "src/app/services/request.service";
import { Injectable } from "@angular/core";


@Injectable()
export class TasksService {
  constructor(private requestService: RequestService) {

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
}