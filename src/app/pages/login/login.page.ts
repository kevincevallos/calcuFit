import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Parse from 'parse';
import { StorageService, Credenciales } from 'src/app/service/storage.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  user: Credenciales = <Credenciales>{};
  items: Credenciales[] = [];
  isLoggedIn:boolean=false;
  rootPage: any;
  constructor(private router: Router,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public activeRoute: ActivatedRoute,
              public storageService: StorageService)    { 
              }
  
  ngOnInit() {
    
    //console.log("user+password"+this.username,this.password);
    }

  signIn() {      
    console.log(this.username, this.password);

    Parse.User.logIn(this.username, this.password).then((resp) => {
      console.log('Logged in successfully', resp);
      //this.storageService.addUser(resp);

      //this.storageService.addUserCredentials(this.username);
       // Clears up the form
       this.username='';
       this.password='';
      this.isLoggedIn=true;
      // If you app has Tabs, set root to TabsPage
      this.rootPage = 'home';
      this.router.navigate(['home']);
      //this.showToast('■ BIENVENIDO A CALCUFIT');

      //this.router.navigateByUrl('home');

    }, err => {
      console.log('Error logging in', err);

      this.showToast('■ Los datos ingresados son incorrectos');
    });
  }

  signUp() {
    Parse.User.signUp(this.username, this.password).then((resp) => {
      //console.log('Logged in successfully', resp);

      // Clears up the form
      this.username.trim;
      this.password.trim;


      this.rootPage = 'home';

      this.router.navigate(['home']);

      this.showToast('■ Cuenta registrada con éxito');
    }, err => {
      console.log('Error signing in', err);

      if (!this.username) {
        this.showToast('■ Por favor ingresa un usuario');
      } 
      if (!this.password) {
        this.showToast('■ Por favor ingresa una contraseña');
      }

    });
  }


  async showToast(msg){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      cssClass: "toast",
      position: 'top',
      color: 'tertiary'
    });
    toast.present();
    }

}
