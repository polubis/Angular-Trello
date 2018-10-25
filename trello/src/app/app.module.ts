import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing-module';
import { MainComponent } from './main/main.component';
import { LogoComponent } from './common/logo/logo.component';
import { ToglerComponent } from './common/togler/togler.component';
import { FormComponent } from './common/form/form.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    LogoComponent,
    ToglerComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
