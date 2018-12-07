
import { RequestService } from "src/app/services/request.service";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { TaskModel } from "src/app/models/task.model";
import * as _ from 'lodash';
import { fromPromise } from "rxjs/internal/observable/fromPromise";
import { Label } from "src/app/models/label.model";


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

  moveTaskIntoOtherBoard(taskId: number, bucket: string){
    ///Task/MoveTask?Id=2&Bucket=2
    const query: string = "?Id=" + taskId.toString() + "&Bucket=" + bucket;
    return this.requestService.executeRequest("moveTask", "put", {}, "", query, {});
  }

  setProjectId(projectId: number){
    this.projectId = projectId;
  }

  putLabelObjectIntoTasks(tasks: any[], labels: Label[]) {
    return tasks.map(task => {
      if (task.labelId && task.labelId !== 0) {
        const labelInProjectLabels = labels.findIndex(x => x.id === task.labelId);
        if (labelInProjectLabels !== -1) {
          const { id, name, color, icon, projectId } = labels[labelInProjectLabels];
          const newTask = {...task, label: new Label(id, name, color, icon, projectId)};
          return newTask;
        }
      }
      return task;
    });
  }

  createBuckets(tasks: any[], projectLabels: Label[]): any{
    const buckets: any = {
      Todo: [],
      InProgress: [],
      Done: [],
    };

    const tasksWithLabelObject = this.putLabelObjectIntoTasks(tasks, projectLabels);

    const indexesKeys = Object.keys(this.bucketIndexes);
    for(let key in tasksWithLabelObject){
      indexesKeys.forEach(element => {
        if(tasks[key].bucket.toLowerCase() === element.toLowerCase()){
          buckets[element].push(tasksWithLabelObject[key]);
        }
      });
    }
    return buckets;
  }

  getTasksForProject(){
    this.requestService.executeRequest("projectDetails", "get", {}, "",
      this.projectId.toString(), {})
      .then((response: any) => {
        this.buckets = this.createBuckets(response.tasks, response.labels);
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

  getComments(taskId: number) {
    return fromPromise(this.requestService.executeRequest('getComments', 'get',{},  "", taskId.toString(), {}));
  }
  deleteComment(commentId: number) {
    return this.requestService.executeRequest('deleteComment', 'delete', {},  "Comment has been succesfully deleted", commentId.toString(), {});
  }
  addComment(formData: any, taskId: number) {
    return this.requestService.executeRequest('addComment', 'post', formData, "Comment has been succesfully added", "", {tasksId: taskId.toString()});
  }
  assignLabelIntoProject(formData: any, projectId: number) {
    return this.requestService.executeRequest('assignLabel', 'put', formData, "Label has been succesfully assigned", projectId.toString(), formData);
  }
}
