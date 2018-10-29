import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { LoggedUserGuard } from './services/logged-user-guard';
import { NotLoggedUserGuard } from "src/app/services/not-logged-user-guard";

const routes: Routes = [
    {path: '', component: HomeComponent, canActivate: [NotLoggedUserGuard] },
    {path: 'projects', component: ProjectsComponent, canActivate: [LoggedUserGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}