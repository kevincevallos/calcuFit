import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlimentosPageRoutingModule } from './alimentos-routing.module';
import { PipesModule } from "../../pipes/pipes.module";
import { AlimentosPage } from './alimentos.page';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentosPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [AlimentosPage]
})
export class AlimentosPageModule {}
