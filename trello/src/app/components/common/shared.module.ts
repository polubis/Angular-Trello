
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

@NgModule({
    declarations: [ FormComponent, LoggedNavigationComponent, 
    LogoComponent, ModalComponent, OperationsComponent, PaginationComponent, 
    SpinnerComponent, ToglerComponent, DebounceClick, ConfirmPromptComponent],
    imports: [CommonModule],
    exports: [
        FormComponent, LoggedNavigationComponent, 
        LogoComponent, ModalComponent, OperationsComponent, PaginationComponent, 
        SpinnerComponent, ToglerComponent, DebounceClick, ConfirmPromptComponent
    ]
})
export class SharedModule {}