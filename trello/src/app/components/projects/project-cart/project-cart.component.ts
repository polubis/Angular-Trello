import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProjectModel } from "src/app/models/project.model";

@Component({
  selector: 'app-project-cart',
  templateUrl: './project-cart.component.html',
  styleUrls: ['./project-cart.component.scss']
})
export class ProjectCartComponent implements OnInit {
  @Input() project: ProjectModel;
  @Input() projectIdWherePictureIsAdding: any;
  @Input() projectPicturesBasePath: string;
  @Input() actualWatchedProject: any;
  @Input() selectClass: string = 'actual-watched-project'
  @Input() btnTitle: string = 'CHECK DETAILS';
  @Output() addingFile = new EventEmitter<any>();
  @Output() clicking = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

}
