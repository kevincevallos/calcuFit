import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosPageRoutingModule } from './datos-routing.module';
import { DatosPage } from './datos.page';
import {  RoundProgressModule,ROUND_PROGRESS_DEFAULTS} from 'angular-svg-round-progressbar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoundProgressModule,
    DatosPageRoutingModule
  ],
  declarations: [DatosPage]
})
export class DatosPageModule {}
