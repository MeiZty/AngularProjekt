import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LrmComponent } from './lrmod/lrm/lrm.component';
import { ExmComponent } from './exm/exm.component';
import { HomeComponent } from './home/home.component';
import { SftComponent } from './lrmod/sft/sft.component';
import { MftComponent } from './lrmod/mft/mft.component';
import { FiftComponent } from './lrmod/fift/fift.component';
import { AftComponent } from './lrmod/aft/aft.component';
import { CheckModusComponent } from './checkmod/check-modus/check-modus.component';
import { AftCheckComponent } from './checkmod/aft-check/aft-check.component';
import { FiftCheckComponent } from './checkmod/fift-check/fift-check.component';
import { MftCheckComponent } from './checkmod/mft-check/mft-check.component';
import { SftCheckComponent } from './checkmod/sft-check/sft-check.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path:'lrm', component: LrmComponent},
  {path:'exm', component: ExmComponent},
  {path:'home', component: HomeComponent},
  {path:'sft',component:SftComponent},
  {path:'mft',component:MftComponent},
  {path:'fift',component:FiftComponent},
  {path:'aft',component:AftComponent},
  {path:'checkmodus',component:CheckModusComponent},
  {path:'aft_check',component:AftCheckComponent},
  {path:'fift_check',component:FiftCheckComponent},
  {path:'mft_check',component:MftCheckComponent},
  {path:'sft_check',component:SftCheckComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
