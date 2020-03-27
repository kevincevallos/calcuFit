import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { StorageService, Persona } from '../service/storage.service';
//import { Persona } from '../persona';
import Parse from 'parse';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
})
export class Ficha implements OnInit {
  newUser: Persona = <Persona>{};
  username: string;
  peso: number;
  altura: number;
  edad: number;
  genero: string;
  actividadDiaria: string;
  objetivo: string;
  constructor(private modalCtrl: ModalController,
    private storageService: StorageService,
    private toastController: ToastController) {
  }
  ionViewWillEnter() {
    this.loadUser();
    this.newUser.actividadDiaria = this.actividadDiaria;
    this.newUser.objetivo = this.objetivo;

  }

  cerrar() {
    this.modalCtrl.dismiss();

  }

  //Back4App Methods}

  ///CREATE
  addUserData() {
    var currentUser = Parse.User.current();
    var query = new Parse.Query(currentUser);
    var id = currentUser.id;
    var activity = this.newUser.actividadDiaria;
    var diaryActivity = parseInt(activity);
    var obj = this.newUser.objetivo;
    var objetivo = parseInt(obj);
    if (!this.newUser.edad || !this.newUser.peso || !this.newUser.altura ||
      !this.newUser.genero || !this.newUser.objetivo || !this.newUser.actividadDiaria) {
      this.showToast("<p>!ERROR!</p>Por favor " + this.username + " llena tu ficha de datos");
    }
    if (this.newUser.peso && this.newUser.altura &&
      this.newUser.edad && this.newUser.genero &&
      this.newUser.objetivo && this.newUser.actividadDiaria) {
      query.get(id).then((user) => {
        var nombre = user.get('username');
        user.set('peso', this.newUser.peso);
        user.set('altura', this.newUser.altura);
        user.set('edad', this.newUser.edad);
        user.set('genero', this.newUser.genero);
        user.set('actividadDiaria', diaryActivity);
        user.set('objetivo', objetivo);
        user.save();
        this.showToast('Datos actualizados ' + this.username);

      });
    }

  }

  //Load User Data
  async loadUser() {
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    var user = Parse.User.current();
    var id = user.id;
    await query.get(id).then((res) => {
      this.username = res.get('username');
      this.newUser.peso = res.get('peso');
      this.newUser.altura = res.get('altura');
      this.newUser.edad = res.get('edad');
      this.newUser.genero = res.get('genero');
      if (this.genero == "m") {
        this.genero = "MASCULINO";
      }
      if (this.genero == "f") {
        this.genero = "FEMENINO";
      }
      this.actividadDiaria = user.get('actividadDiaria');
      if (this.actividadDiaria == "0") {
        this.actividadDiaria = "POCO";
        this.newUser.actividadDiaria = "0";
      }
      if (this.actividadDiaria == "1") {
        this.actividadDiaria = "LIGERO";
        this.newUser.actividadDiaria = "1";
      }
      if (this.actividadDiaria == "2") {
        this.actividadDiaria = "MODERADO";
        this.newUser.actividadDiaria = "2";
      }
      if (this.actividadDiaria == "3") {
        this.actividadDiaria = "DEPORTISTA";
        this.newUser.actividadDiaria = "3";
      }
      if (this.actividadDiaria == "4") {
        this.actividadDiaria = "ATLETA";
        this.newUser.actividadDiaria = "4";
      }
      this.objetivo = user.get('objetivo');
      if (this.objetivo == "0") {
        this.objetivo = "BAJAR";
        this.newUser.objetivo = "0";
      }
      if (this.objetivo == "1") {
        this.objetivo = "MANTENER";
        this.newUser.objetivo = "1";
      }
      if (this.objetivo == "2") {
        this.objetivo = "SUBIR";
        this.newUser.objetivo = "2";
      }
      //console.log('userIdDieta', res.id, user.get('actividadDiaria'));
    });

  }

  //SHOWTOAST
  async showToast(msg) {
    const toast = await this.toastController.create({
      header: 'Actualizando datos de usuario:',
      message: msg,
      translucent: true,
      position: 'top',
      duration: 3000,
      color: "light",
      buttons: [
        {
          side: 'start',
          icon: 'person',
          text: ''
        }, {
          side: 'end',
          text: 'OK',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  ngOnInit() {
  }

}
