import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "src/app/services/projects.service";
import { ActivatedRoute } from "@angular/router";
import { ProjectModel } from "src/app/models/project.model";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  isLoadingProjectDetails: boolean = false;
  lastAddedTasks: any[] = [
    {id: 0, content: "Adding new person into clients view asd sad sasad asds asdsad sadasdasdsadasd as sas sads as"},
    {id: 1, content: "Adding new person into clients view"},
    {id: 2, content: "Adding new person into clients view"},
    {id: 3, content: "Adding new person into clients view"},
    {id: 4, content: "Adding new person into clients view"}
  ]
  project: ProjectModel = {
    name: "Website for Client",
    id: 1,
    collaborators: ["TOmasz"],
    role: 1, 
    creationDate: new Date(),
    description: `Lorem Ipsum jest tekstem stosowanym jako 
    przykładowy wypełniacz w przemyśle poligraficznym. 
    Został po raz pierwszy użyty w XV w. przez 
    nieznanego drukarza do wypełnienia tekstem próbnej 
    książki. Pięć wieków później zaczął być używany 
    przemyśle elektronicznym, pozostając praktycznie 
    niezmienionym. Spopularyzował się w latach 60. XX 
    w. wraz z publikacją arkuszy Letrasetu, zawierających 
    fragmenty Lorem Ipsum, a ostatnio z zawierającym 
    różne wersje Lorem Ipsum oprogramowaniem 
    przeznaczonym do realizacji druków na komputerach 
    osobistych, jak Aldus PageMaker`,
    img: "assets/guitar.jpg",
    color: "#ffffff",
    closingDate: null
  };
  contributors: any[] = [
    {img: 'assets/guitar.jpg', sex: "male"},
    {img: 'assets/guitar.jpg', sex: "male"},
    {img: 'assets/guitar.jpg', sex: "male"},
    {img: 'assets/guitar.jpg', sex: "male"},
    {img: null, sex: "male"},
    {img: null, sex: "male"},
    {img: null, sex: "male"},
    {img: null, sex: "male"}
  ];
  
  constructor(private projectsService: ProjectsService, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if(this.projectsService.projects.length > 0){
        this.isLoadingProjectDetails = true;
        this.projectsService.getProjectDetails(param.id).then(response => {
          this.isLoadingProjectDetails = false;
        }).catch(error => this.isLoadingProjectDetails = false);
      }
    })
  }
  
}
