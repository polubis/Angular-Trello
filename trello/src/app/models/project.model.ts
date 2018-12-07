import { TaskModel } from "src/app/models/task.model";

export class ProjectModel {
  constructor(
    public name: string,
    public id: number,
    public collaborators: string[],
    public role: number,
    public creationDate: any = null,
    public description: string = "",
    public img: string = "",
    public color: string = "",
    public closingDate: any = null,
    public tasks: TaskModel[] = [],
    public picturePath: string = ""
  ) {}
}
