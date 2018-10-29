import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing-module';
import { ProjectsComponent } from './components/projects/projects.component';
import { LogoComponent } from './components/common/logo/logo.component';
import { ToglerComponent } from './components/common/togler/togler.component';
import { FormComponent } from './components/common/form/form.component';
import { ModalComponent } from './components/common/modal/modal.component';
import { FormService } from './services/form.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from './services/request.service';
import { SpinnerComponent } from './components/common/spinner/spinner.component';
import { OperationsComponent } from './components/common/operations/operations.component';
import { OperationsService } from './services/operations.service';
import { AuthService } from './services/auth.service';
import { LoggedUserGuard } from './services/logged-user-guard';
import { NotLoggedUserGuard } from "src/app/services/not-logged-user-guard";
import { LoggedNavigationComponent } from './components/common/logged-navigation/logged-navigation.component';
import { PaginationComponent } from './components/common/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    LogoComponent,
    ToglerComponent,
    FormComponent,
    ModalComponent,
    SpinnerComponent,
    OperationsComponent,
    LoggedNavigationComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [RequestService, FormService, OperationsService, AuthService, LoggedUserGuard, NotLoggedUserGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
