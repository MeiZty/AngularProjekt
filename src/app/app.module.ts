import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SftComponent } from './lrmod/sft/sft.component';
import { MftComponent } from './lrmod/mft/mft.component';
import { FiftComponent } from './lrmod/fift/fift.component';
import { AftComponent } from './lrmod/aft/aft.component';
import { ExmComponent } from './exm/exm.component';
import { LrmComponent } from './lrmod/lrm/lrm.component';
import { HomeComponent } from './home/home.component';
import { CheckSComponent } from './check.s/check.s.component';
import { AftCheckComponent } from './checkmod/aft-check/aft-check.component';
import { FiftCheckComponent } from './checkmod/fift-check/fift-check.component';
import { MftCheckComponent } from './checkmod/mft-check/mft-check.component';
import { SftCheckComponent } from './checkmod/sft-check/sft-check.component';
import { CheckModusComponent } from './checkmod/check-modus/check-modus.component';

@NgModule({
  declarations: [
    AppComponent,
    SftComponent,
    MftComponent,
    FiftComponent,
    AftComponent,
    ExmComponent,
    LrmComponent,
    HomeComponent,
    CheckSComponent,
    AftCheckComponent,
    FiftCheckComponent,
    MftCheckComponent,
    SftCheckComponent,
    CheckModusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
