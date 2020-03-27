import { Component, ViewChild, NgZone, Input, OnInit } from '@angular/core';
import { Platform, IonContent } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import Parse from 'parse';
import { Router } from '@angular/router';
import { Persona } from './persona';
import { StorageService, Alimento } from './service/storage.service';
import { ALIMENTOS } from './data-alimentos';
import { HomePage } from './home/home.page';
import { WelcomePage } from './pages/welcome/welcome.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  @ViewChild(IonContent,{static: false}) content: IonContent;
  rootPage: any;
  navigate: any;
  userData: any;
  user: Persona = <Persona>{};
  alimentos = ALIMENTOS;
  newAlimento: Alimento = <Alimento>{};
  isLoggedIn:boolean=false;
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService
  ) {

    //this.sideMenu();
    this.initializeApp();
  }
  ScrollToTop(){
    this.content.scrollToTop(1500);
  }
  
  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Alimentos",
        url   : "home/alimentos",
        icon  : "pizza"
      },
      {
        title : "Mis Datos",
        url   : "home/datos",
        icon  : "contact"
      },
      {
        title : "Dieta",
        url   : "home/dieta",
        icon  : "list-box"
      },
      {
        title : "Ajustes",
        url   : "home/settings",
        icon  : "cog"
      }
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
      Parse.serverURL = 'https://parseapi.back4app.com/';

      Parse.User.currentAsync().then(user => {
        if (user) {
          console.log('Logged user:::', user);
          this.rootPage = 'home';
          this.router.navigate(['home']);
          
        }
      }, err => {
        console.log('Error getting logged user');

        this.rootPage = '';
        this.router.navigate(['']);
      })

    });
  }


 /* setAlimentos() {
    for (const key in this.alimentos) {
      const element = this.alimentos[key];
      //console.log(element);
      this.newAlimento = element;
      for (let i = 0; i < this.alimentos.length; i++) {
        const e = this.alimentos[i];
      //console.log(e+"SetAlimentos");  

      }
        this.storageService.addItem(this.alimentos[key]);

    }

  }*/

  getData() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const Alimentos = Parse.Alimentos.
        Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
      Parse.serverURL = 'https://parseapi.back4app.com/';

      Parse.User.currentAsync().then(user => {
        //console.log('Logged user', user);
        this.userData = user;
        console.log("Esta es la data:" + this.userData.id);


      }, err => {
        console.log('Error getting logged user');

        //this.rootPage = 'login';
        //this.router.navigate(['login']);
      })

    });



  }
}
