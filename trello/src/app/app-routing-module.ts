import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LoggedUserGuard } from './services/logged-user-guard';
import { NotLoggedUserGuard } from "src/app/services/not-logged-user-guard";
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';
import { ManageComponent } from "src/app/components/manage/manage.component";
import { TasksComponent } from "src/app/components/manage/tasks/tasks.component";
const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [NotLoggedUserGuard] },
  {
    path: "manage/:id",
    component: ManageComponent,
    canActivate: [LoggedUserGuard],
    children: [
      {
        path: "tasks", pathMatch: 'full',
        component: TasksComponent,
        canActivate: [LoggedUserGuard]
      }
    ]
  },
  {
    path: "projects",
    component: ProjectsComponent,
    canActivate: [LoggedUserGuard],
    children: [
      {
        path: ":id",
        component: ProjectDetailsComponent,
        canActivate: [LoggedUserGuard]
      }
    ]
  },
  { path: '**', redirectTo: "projects" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
