import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Label } from "src/app/models/label.model";
import { TasksService } from "src/app/services/tasks.service";

@Component({
  selector: 'app-label-selector',
  templateUrl: './label-selector.component.html',
  styleUrls: ['../selector/selector.component.scss', './label-selector.component.scss']
})
export class LabelSelectorComponent implements OnInit {
  @Input() taskId: number;
  @Input() labels: Label[];
  @Input() shouldHaveSaveButton = true;
  @Input() operationTitle;
  @Output() labelSaved = new EventEmitter<Label>();
  isPaleteOpen = false;
  currentSelectedLabel: Label;
  isSavingItem = false;
  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  }

  toglePalete() {
    if (this.isPaleteOpen) {
      this.currentSelectedLabel = null;
    }
    this.isPaleteOpen = !this.isPaleteOpen;
  }

  chooseLabel(label: Label) {
    this.currentSelectedLabel = label;
  }

  saveLabel = () => {
    this.isSavingItem = true;
    const model = {
      taskId: this.taskId,
      labelId: this.currentSelectedLabel.id
    };
    this.tasksService.assignLabelIntoProject(model, this.currentSelectedLabel.projectId).then(response => {
      this.labelSaved.emit(this.currentSelectedLabel);
      console.log(this.currentSelectedLabel);
      this.isSavingItem = false;
      this.toglePalete();
    }).catch(() => {
      this.isSavingItem = false;
    })
  }
}
