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
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    LogoComponent,
    ToglerComponent,
    FormComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
