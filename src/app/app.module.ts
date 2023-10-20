import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './inicio/inicio.component';
import { NbIconModule, NbThemeModule, NbStatusService, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    NbThemeModule,
    AppRoutingModule,
    NgbModule,
    NbIconModule,
    NbEvaIconsModule,
    NbCardModule
  ],
  providers: [
    NbStatusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
