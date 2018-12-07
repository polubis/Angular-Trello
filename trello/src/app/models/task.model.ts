


import { Label } from "src/app/models/label.model";

export class TaskModel {
    constructor(public name: string, public description: string, public color: string, public id: number, public userId: string, labelId?: number,
      label?: Label){}
}
