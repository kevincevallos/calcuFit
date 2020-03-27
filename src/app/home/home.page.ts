import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from "../app.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, NavController, Platform, ModalController } from '@ionic/angular';
import { BaseDatosLocalService } from "../base-datos-local.service";
//import { Socket } from 'ngx-socket-io';
import Parse from 'parse';
import { Ficha } from "../ficha/ficha.page";

import { ToastController } from '@ionic/angular';
@Component({
   selector: 'app-home',
   templateUrl: './home.page.html',
   styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   message = '';
   messages = [];
   username:string;
   currentUser = '';
   user = null;
   public hasData: boolean = false;
   public technologies: any;
   public dataImported: boolean = false;
   private _SQL_NAME: string = 'technologies.sql';
   private _SQL_URI: string = encodeURI("http://REMOTE-URI-HERE/technologies.sql");
   private _JSON_NAME: string = 'technologies.json';
   private _JSON_URI: string = encodeURI("http://REMOTE-URI-HERE/technologies.json");
   private _REMOTE_URI: string = "http://REMOTE-URI-HERE/parse-data.php";
   isLoggedIn: boolean;
   clickSub: any;
   constructor(private activeRoute: ActivatedRoute,
      private app: AppComponent,
      public navCtrl: NavController,
      private _ALERT: AlertController,
      private _HTTP: HttpClient,
      private _DB: BaseDatosLocalService,
      private _PLAT: Platform,
      //private socket: Socket,
       private toastCtrl: ToastController,
       public modalController: ModalController) {
      this.isLoggedIn = true;
      this.loadUser();

   }
loadUser(){
   Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
  Parse.serverURL = 'https://parseapi.back4app.com/';
  var user = Parse.User.current();
  this.username = user.get('username');
   //console.log('userIdDieta',user.id,this.username);
}

async agregarFicha() {
   const modal = await this.modalController.create({
 
     component: Ficha,
     componentProps: {
     }
 });
 
   return await modal.present();
   
 }

   /**/
   ngOnInit() {
      //For chat socket connection
      /*
      this.socket.connect();
 
      let name = `user-${new Date().getTime()}`;
      this.currentUser = name;
      
      this.socket.emit('set-name', name);
   
      this.socket.fromEvent('users-changed').subscribe(data => {
        let user = data['user'];
        if (data['event'] === 'left') {
          this.showToast('User left: ' + user);
        } else {
          this.showToast('User joined: ' + user);
        }
      });
   
      this.socket.fromEvent('message').subscribe(message => {
        this.messages.push(message);
      });
   }

      sendMessage() {
         this.socket.emit('send-message', { text: this.message });
         console.log(this.message);
         this.message = '';
       }
      
       ionViewWillLeave() {
         this.socket.disconnect();
       }
      
       async showToast(msg) {
         let toast = await this.toastCtrl.create({
           message: msg,
           position: 'top',
           duration: 2000
         });
         toast.present();*/
       }
      /*
  //console.log(this.user);
  this._PLAT
       .ready()
       .then(() =>
       {
          setTimeout(() =>
          {
             this._DB
             .dataExistsCheck('alimentos')
             .then((data) =>
             {
                this.loadRecords();
             })
             .catch((error) =>
             {
                console.dir(error);
             });
          }, 1500);
       });*/
   

   /**
    * @public
    * @method parseAndUploadSQL
    * @param fileName     {String}      The file name for the exported SQL data
    * @param fileName     {String}      The exported SQL data
    * @description        Posts the exported SQL data to the remote PHP script using Angular's HttpClient module
    * @return {none}
    */
   parseAndUploadSQL(fileName: string, sqlData: any) {
      let headers: any = new HttpHeaders({ 'Content-Type': 'application/octet-stream' }),
         options: any = { "name": fileName, "data": sqlData };

      this._HTTP
         .post(this._REMOTE_URI, JSON.stringify(options), headers)
         .subscribe((res: any) => {
            console.dir(res);
         },
            (error: any) => {
               console.dir(error);
            });
   }

   getDatos() {

      try {
         console.log("user: " + this.user);
         return this.app.getData();

      } catch (error) {

      }

   }

}
