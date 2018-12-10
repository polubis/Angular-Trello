import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing-module';
import { ProjectsComponent } from './components/projects/projects.component';
import { FormService } from './services/form.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from './services/request.service';
import { OperationsService } from './services/operations.service';
import { AuthService } from './services/auth.service';
import { LoggedUserGuard } from './services/logged-user-guard';
import { NotLoggedUserGuard } from "src/app/services/not-logged-user-guard";
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { ProjectsService } from "src/app/services/projects.service";
import { SharedModule } from "src/app/components/common/shared.module";
import { TasksComponent } from './components/manage/tasks/tasks.component';
import { TasksService } from "src/app/services/tasks.service";
import { ColorsService } from "src/app/services/colors.service";
import { ManageComponent } from './components/manage/manage.component';
import { IconsService } from "src/app/services/icons.service";
import { UsersService } from "src/app/services/users.service";
import { ProjectCartComponent } from './components/projects/project-cart/project-cart.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    TasksComponent,
    ManageComponent,
    ProjectCartComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    RequestService,
    FormService,
    OperationsService,
    AuthService,
    LoggedUserGuard,
    UsersService,
    NotLoggedUserGuard,
    TasksService,
    ProjectsService,
    ColorsService,
    IconsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
