
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

@NgModule({
    declarations: [ FormComponent, LoggedNavigationComponent, 
    LogoComponent, ModalComponent, OperationsComponent, PaginationComponent, 
    SpinnerComponent, ToglerComponent, DebounceClick, ConfirmPromptComponent, ErrorHandlerComponent,
    LengthPipe, SortingPipe, FilterPipe,
    TasksListComponent,
    SelectorComponent],
    imports: [CommonModule, AppRoutingModule],
    exports: [
        FormComponent, LoggedNavigationComponent, 
        LogoComponent, ModalComponent, OperationsComponent, PaginationComponent, 
        SpinnerComponent, ToglerComponent, DebounceClick, ConfirmPromptComponent,
        ErrorHandlerComponent, LengthPipe, TasksListComponent, SelectorComponent, SortingPipe,
        FilterPipe
    ]
})
export class SharedModule {}