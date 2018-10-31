

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
}