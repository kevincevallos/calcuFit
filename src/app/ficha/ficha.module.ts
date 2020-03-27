import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from "@angular/material/expansion";
import { IonicModule } from '@ionic/angular';
import { MatSelectModule } from "@angular/material/select";

import { FichaRoutingModule } from './ficha-routing.module';

import { Ficha } from './ficha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaRoutingModule,
    MatExpansionModule,
    MatSelectModule
  ],
  declarations: [Ficha]
})
export class FichaModule {}
