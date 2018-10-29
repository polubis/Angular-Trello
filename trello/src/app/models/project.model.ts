export class ProjectModel{
    constructor(public name: string, public id: number,
    public collaborators: string[], public role: number, public creationDate: string,
    public description: string = "", public img: string = "", public color: string = ""){}
}