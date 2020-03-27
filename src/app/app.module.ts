import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { BaseDatosLocalService } from "../app/base-datos-local.service";
import { IonicModule, IonicRouteStrategy, IonApp } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Health } from "@ionic-native/health/ngx";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlimentosPage } from "../app/pages/alimentos/alimentos.page";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { IonicStorageModule, Storage } from "@ionic/storage";
import { HttpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { FichaModule  } from "./ficha/ficha.module";
import { AlimentoPageModule } from "./alimento/alimento.module";
import { DietaPage } from './pages/dieta/dieta.page';
import { DietaPageModule } from './pages/dieta/dieta.module';
//import { AlimentosPageModule } from './pages/alimentos/alimentos.module';
import { NgxQRCodeModule } from "ngx-qrcode2";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { HomePageModule } from './home/home.module';
import { HomePage } from './home/home.page';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { Vibration } from '@ionic-native/vibration/ngx';

//For socket localhost chat connection
//import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
//const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
@NgModule({
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  imports: [ 
    BrowserModule,
    RoundProgressModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }), FormsModule, HomePageModule, HttpModule, HttpClientModule, 
    IonicModule.forRoot(), IonicStorageModule.forRoot(), 
    AppRoutingModule, FichaModule,
    BrowserAnimationsModule, 
    AlimentoPageModule, NgxQRCodeModule
    //SocketIoModule.forRoot(config)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    SQLitePorter,
    Vibration,
    Health,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: ErrorHandler, useClass: ErrorHandler},
    BaseDatosLocalService,
    AlimentosPage,
    BarcodeScanner,
    HomePageModule
  ],    

  bootstrap: [AppComponent]
})
export class AppModule {}
