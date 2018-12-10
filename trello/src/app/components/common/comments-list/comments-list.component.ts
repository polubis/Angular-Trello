import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from "src/app/services/tasks.service";
import { Subscription } from "rxjs";
import { addCommentFormSettings } from '../../../constants/constants';
import FormModel from "src/app/models/form.model";
import { OperationsService } from "src/app/services/operations.service";
import { userPicturesBasePath } from '../../../constants/constants';
@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  @Input() taskId: number;
  comments: any[] = [];
  isCommentsShowed = false;
  isLoading = false;
  isAddingComment = false;
  isDeletingComment = false;
  isAddingCommentModalOpen = false;
  commentToDelete = -1;
  addCommentFormSettings: FormModel[] = [...addCommentFormSettings];
  userPicturesBasePath = userPicturesBasePath;
  constructor(private tasksService: TasksService, private operationsService: OperationsService) { }

  ngOnInit() {
  }
  togleComments() {
    if (this.isCommentsShowed) {
      this.isCommentsShowed = false;
    } else {
      this.getComments();
    }
  }

  getComments() {
    this.isCommentsShowed = true;
    this.isLoading = true;

    this.tasksService.getComments(this.taskId).subscribe((comments: any[]) => {
      this.comments = comments;
      console.log(this.comments);
      this.isLoading = false;
    });
  }
  togleAddingComments() {
    this.isAddingCommentModalOpen = !this.isAddingCommentModalOpen;
  }
  setCommentToDelete(index: number) {
    this.commentToDelete = index;
  }

  addComment = (formData: any) => {
    this.isAddingComment = true;
    this.tasksService.addComment(formData, this.taskId).then((comments: any[]) => {
      this.isAddingComment = false;
      this.isAddingCommentModalOpen = false;
      this.getComments();
      this.operationsService.removeAllAfterDelay(3000);
    }).catch(() => {
      this.isAddingComment = false;
    });
  }

  deleteComment() {
    this.isDeletingComment = true;
    this.tasksService.deleteComment(this.comments[this.commentToDelete].id).then((comments: any[]) => {
      this.setCommentToDelete(-1);
      this.isDeletingComment = false;
      const copiedComments = [...this.comments];
      copiedComments.splice(this.commentToDelete, 1);
      this.comments = copiedComments;
      this.commentToDelete = -1;
    }).catch(() => {
      this.isAddingComment = false;
    })
  }
}
