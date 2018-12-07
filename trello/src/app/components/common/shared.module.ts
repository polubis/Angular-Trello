
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormComponent } from "src/app/components/common/form/form.component";
import { LoggedNavigationComponent } from "src/app/components/common/logged-navigation/logged-navigation.component";
import { LogoComponent } from "src/app/components/common/logo/logo.component";
import { ModalComponent } from "src/app/components/common/modal/modal.component";
import { OperationsComponent } from "src/app/components/common/operations/operations.component";
import { PaginationComponent } from "src/app/components/common/pagination/pagination.component";
import { SpinnerComponent } from "src/app/components/common/spinner/spinner.component";
import { ToglerComponent } from "src/app/components/common/togler/togler.component";
import { DebounceClick } from "src/app/directives/debounce-click";
import { ConfirmPromptComponent } from './confirm-prompt/confirm-prompt.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { LengthPipe } from "src/app/directives/length-pipe";
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { SelectorComponent } from '../common/selector/selector.component'
import { AppRoutingModule } from "src/app/app-routing-module";
import { SortingPipe } from "src/app/directives/sorting-pipe";
import { FilterPipe } from "src/app/directives/filter-pipe";
import { UsersListComponent } from './users-list/users-list.component';
import { SearcherComponent } from './searcher/searcher.component';
import { DragDropDirectiveModule} from "angular4-drag-drop";
import { CommentsListComponent } from './comments-list/comments-list.component';
import { LabelSelectorComponent } from './label-selector/label-selector.component';
import { FilePickerComponent } from './file-picker/file-picker.component';
@NgModule({
    declarations: [ FormComponent, LoggedNavigationComponent,
    LogoComponent, ModalComponent, OperationsComponent, PaginationComponent,
    SpinnerComponent, ToglerComponent, DebounceClick, ConfirmPromptComponent, ErrorHandlerComponent,
    LengthPipe, SortingPipe, FilterPipe,
    TasksListComponent,
    SelectorComponent,
    UsersListComponent,
    SearcherComponent,
    CommentsListComponent,
    LabelSelectorComponent,
    FilePickerComponent
    ],
    imports: [CommonModule, AppRoutingModule, DragDropDirectiveModule],
    exports: [
        FormComponent, LoggedNavigationComponent,
        LogoComponent, ModalComponent, OperationsComponent, PaginationComponent,
        SpinnerComponent, ToglerComponent, DebounceClick, ConfirmPromptComponent,
        ErrorHandlerComponent, LengthPipe, TasksListComponent, SelectorComponent, SortingPipe,
        FilterPipe, UsersListComponent, SearcherComponent, CommentsListComponent, LabelSelectorComponent, FilePickerComponent
    ]
})
export class SharedModule {}
