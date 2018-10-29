import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing-module';
import { MainComponent } from './components/main/main.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    LogoComponent,
    ToglerComponent,
    FormComponent,
    ModalComponent,
    SpinnerComponent,
    OperationsComponent
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
