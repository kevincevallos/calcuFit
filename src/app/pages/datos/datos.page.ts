import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonTabBar, IonList, AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { ModalController } from "@ionic/angular";
import { AlimentoPage } from "../../alimento/alimento.page";
import { Ficha } from "../../ficha/ficha.page";
import { Storage } from "@ionic/storage";
import { PERSONAS } from 'src/app/data-persona';
import { StorageService, Persona } from 'src/app/service/storage.service';
import { Router } from '@angular/router';
import { Health } from "@ionic-native/health/ngx";
import { AppComponent } from "../../app.component";
import Parse from 'parse';
@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  @Input('nombre') nombre: string;

  public rs: number = 0;

  newUser: Persona = <Persona>{};
  items: Persona[] = [];
  //items2: Persona[] = [];
  userId: string;
  lograFat: boolean;
  lograCarbos: boolean;
  lograProtein: boolean;
  lograCal: boolean;
  user: Persona = <Persona>{};
  proteina: number;
  carbohidrato: number;
  grasa: number;
  username: string;
  caloriasRestantes: number;
  caloriasDiarias: number;
  proteinaRestante: number;
  carbohidratoRestante: number;
  grasaRestante: number;
  caloriasSemanales: number;
  caloriasMensuales: number;
  h: Health;
  nuevoPeso: number;
  x: number;
  y: number;
  z: number;

  //calorias: number=null;
  personas = PERSONAS;

  page1 = 'FamilyListPage';
  @ViewChild('myTabs', { static: false }) tabRef: IonTabBar;
  @ViewChild('myList', { static: false }) listRef: IonList;
  tabs: any;
  tabIndex: number;
  reorder: boolean;
  classrooms: any;
  datos = [];
  progressCal;
  progressProtein;
  progressCarbos;
  progressFat;
  //persona: Persona[] = [];
  isenabled: boolean = false;
  USERS_KEY = 'my_users';
  bajarPeso: number = 0.80;
  //mantenerPeso: number=0.20;
  subirPeso: number = 1.20;
  constructor(public modalController: ModalController,
    public storageService: StorageService,
    private plt: Platform,
    private toastController: ToastController,
    private router: Router,
    public alertController: AlertController,
    public health: Health,
    public storage: Storage,
    public app: AppComponent) {
    //this.calcularCalorias();
    //this.obtenerDatosUsuario();
    //this.contarCalorias();
    //this.newUser=this.app.userData;

    //console.log("X",this.newUser.id);
    /* health.isAvailable()
     .then((available:boolean) => {
       console.log(available);
       this.health.requestAuthorization([
         'distance', 'nutrition',  //read and write permissions
         {
           read: ['steps'],       //read only permission
           write: ['height', 'weight']  //write only permission
         }
       ])
       .then(res => console.log(res))
       .catch(e => console.log(e));
     })
     .catch(e => console.log(e));
*/

    /* if (this.items) {
       this.isenabled=true;
     } else{
       this.isenabled=false;

     }*/

  }
  ionViewWillEnter() {
    this.loadUserData();
    //this.contarCalorias();
    //this.obtenerDatosUsuario();
    setTimeout(() => {
    }, 1000);
  }


  //Back4AppMethods
  /*obtenerDatosUsuario(){

  this.storageService.getUserDetails().then(res=>{
    this.user=res;
console.log("ResponseUserId:_",this.user);
  });
  }*/

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      //this.items.unshift(...this.newItems);
      //this.newItems = [];
      //this.proteina=0;
      //this.carbohidrato=0;
      //this.grasas=0;
      //this.contarCalorias();
      this.loadUserData();
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async loadCalorias() {
    this.storageService.getMyItems().then(items => {
      for (const i in items) {
        const nombre = items[i].nombreAlimento;
        let val = items[i].calorias;
        this.caloriasRestantes = this.caloriasDiarias - val;
        console.log(nombre, val, this.caloriasDiarias, this.caloriasRestantes);
      }
      console.log('Calorias_Restantes_:', this.newUser.caloriasDiarias, this.caloriasRestantes);
    })
    //this.caloriasRestantes=this.newUser.caloriasDiarias;


  }

  async agregarFicha() {
    const modal = await this.modalController.create({

      component: Ficha,
      componentProps: {
      }
    });

    return await modal.present();

  }
  /*async openModal() {
    const modal = await this.modalController.create({

      component: FamilyListPage,
      componentProps: {
      }
  });
 
    return await modal.present();
    
 }*/


  ///CÁLCULO CALORÍAS
  async contarCalorias() {
    //let cal = 'calorias';

    this.proteina = Math.floor((this.user.calorias * 0.3) / 4);
    this.newUser.proteinas = this.proteina;
    this.carbohidrato = Math.floor((this.user.calorias * 0.5) / 4);
    this.newUser.carbohidratos = this.carbohidrato;
    this.grasa = Math.floor((this.user.calorias * 0.2) / 9);
    this.newUser.grasas = this.grasa;

    if (!this.proteina && !this.carbohidrato && !this.grasa && !this.user.calorias) {
      this.proteina = 0;
      this.carbohidrato = 0;
      this.grasa = 0;
      this.user.calorias = 0;
    }
    //this.newUser.proteinas = this.proteina;

    this.user.proteinas = this.proteina;
    this.user.carbohidratos = this.carbohidrato;
    this.user.grasas = this.grasa;
    //this.updateUserData(this.user);

    //this.loadUserData();
    //this.z = this.newUser.calorias=this.newUser.edad;

  }


  ///CRUD FOR PERSONAS

  ///CREATE
  addUserData() {
    //this.loadUserData();   




    //this.isenabled=true;
    this.newUser.modified = Date.now();
    this.newUser.id = Date.now();

    this.storageService.addUserDetails(this.newUser).then(item => {
      this.loadUserData();
      //console.log("item: ",item);
      //console.log(this.newUser.id,"|",this.user.id);
      //this.newUser = <Persona>{};
      //console.log("Calorias1"+this.newUser.calorias)
      //console.log("Calorias1"+this.user.calorias)
      this.newUser.calorias = this.user.calorias;
      //console.log("Calorias2"+this.newUser.calorias)
      //console.log("Calorias2"+this.user.calorias)
      this.showToast(' Datos añadidos!');
      //this.isenabled=false;

    });
  }
  ///READ

  calcularCalorias() {
    var Alimentos = new Parse.Object.extend("Alimentos");
    var query = new Parse.Query(Alimentos);
    Parse.User.currentAsync().then(async user => {
      //query.equalTo("id_usuario",this.userId)
      this.userId = user.id;
      //console.log("this.userId:_" + this.userId);
      query.equalTo("id_usuario", user.id)
      await query.find()
        //query.get("HPzsOvhdqG")
        .then((alimento) => {
          //console.log('TAMAÑOALIMENTO_:',alimento.length)
          var y: number;
          var p: number;
          var c: number;
          var g: number;
          this.newUser.caloriasRestantes = this.user.calorias;
          this.newUser.proteinaRestante = this.user.proteinas;

          for (let i = 0; i < alimento.length; i++) {
            const id = alimento[i].get('id_usuario');
            y = alimento[i].get('calorias');
            p = alimento[i].get('proteinas');
            c = alimento[i].get('carbohidratos');
            g = alimento[i].get('grasas');
            this.newUser.caloriasRestantes = this.newUser.caloriasRestantes - y;
            this.newUser.proteinaRestante = this.newUser.proteinaRestante - p;
            this.newUser.carbohidratoRestante = this.newUser.carbohidratoRestante - c;
            this.newUser.grasaRestante = this.newUser.grasaRestante - g;
            const cal = this.user.calorias - this.newUser.caloriasRestantes;
            const proetin = this.user.proteinas - this.newUser.proteinaRestante;
            const carbos = this.user.carbohidratos - this.newUser.carbohidratoRestante;
            const fat = this.user.grasas - this.newUser.grasaRestante;
            this.progressCal = (cal * 0.1) / (this.newUser.calorias / 10);
            this.progressProtein = (proetin * 0.1) / (this.newUser.proteinas / 10);
            this.progressCarbos = (carbos * 0.1) / (this.newUser.carbohidratos / 10);
            this.progressFat = (fat * 0.1) / (this.newUser.grasas / 10);
            console.log(this.progressCal, this.progressProtein);

          }
          if (this.newUser.grasaRestante <= 0) {
            this.lograFat = true;
          } else {
            this.lograFat = false;
          }
          if (this.newUser.carbohidratoRestante <= 0) {
            this.lograCarbos = true;
          } else {
            this.lograCarbos = false;
          }
          if (this.newUser.proteinaRestante <= 0) {
            this.lograProtein = true;
          } else {
            this.lograProtein = false;
          }
          if (this.newUser.caloriasRestantes <= 0) {
            this.lograCal = true;
          } else {
            this.lograCal = false;
          }
          console.log('caloriasRestantes_user_:', this.newUser.caloriasRestantes, this.newUser.carbohidratoRestante);
          user.set('caloriasRestantes', this.newUser.caloriasRestantes);
          user.set('proteinaRestante', this.newUser.proteinaRestante);
          user.set('carbohidratoRestante', this.carbohidratoRestante);
          user.set('grasaRestante', this.grasaRestante);
        })


    })
  }

  async loadUserData() {

    /////////Storage-Back4App//////////
    var currentUser = Parse.User.current();
    var query = new Parse.Query(currentUser);
    var id = currentUser.id;
    //console.log('USERNAME_:', currentUser.get('username'));

    query.get(id).then((res) => {
      this.items = [];
      this.items.push(res);
      this.username = res.get('username');
      this.user.peso = res.get('peso');
      this.user.edad = res.get('edad');
      this.user.altura = res.get('altura');
      this.user.objetivo = res.get('objetivo');
      this.user.genero = res.get('genero');
      this.user.actividadDiaria = res.get('actividadDiaria');
      this.user.calorias = res.get('calorias');
      this.caloriasRestantes = res.get('caloriasRestantes')

      /////////Storage-Ionic/////////////
      //console.log("THIS.ITEMS_: "+this.items);
      //this.storageService.getUserDetails().then(i => {
      //this.items = i;


      //console.log("Esto es I:_"+this.items);

      //console.log("Calorìas: " + this.user.actividadDiaria);


      if (this.user.genero == "m") {
        //console.log("masculino");
        this.user.calorias = (66 + (13.7 * this.user.peso) + (5 * this.user.altura) - (6.75 * this.user.edad));
      }
      if (this.user.genero == "f") {
        this.user.calorias = (655 + (9.6 * this.user.peso) + (1.8 * this.user.altura) - (4.7 * this.user.edad));
        //console.log("Femenino");
      }
      if (this.user.actividadDiaria == "0") {
        //console.log(0);
        this.user.calorias = this.user.calorias * 1.2;
        //console.log(this.user.calorias); 
      }
      if (this.user.actividadDiaria == "1") {
        //console.log(1);
        this.user.calorias = this.user.calorias * 1.375;
        //console.log(this.user.calorias); 
      }
      if (this.user.actividadDiaria == "2") {
        this.user.calorias = this.user.calorias * 1.55;
        //console.log(this.user.calorias); 
        //console.log(2);
      }
      if (this.user.actividadDiaria == "3") {
        this.user.calorias = this.user.calorias * 1.72;
        //console.log(this.user.calorias); 
        //console.log(3);
      }
      if (this.user.actividadDiaria == "4") {
        this.user.calorias = this.user.calorias * 1.9;
        //console.log(this.user.calorias); 
        //console.log(4);
      }
      if (this.user.objetivo == "0") {
        this.user.calorias = this.user.calorias * this.bajarPeso;
        //console.log(this.user.calorias);
      }
      if (this.user.objetivo == "1") {
        this.user.calorias = this.user.calorias;
        //console.log(this.user.calorias);
      }
      if (this.user.objetivo == "2") {
        this.user.calorias = this.user.calorias * this.subirPeso;
        //console.log(this.user.calorias);
      }
      this.user.calorias = Math.floor(this.user.calorias);
      this.contarCalorias();
      this.newUser.calorias = this.user.calorias;
      this.newUser.caloriasDiarias = this.user.calorias;
      //this.newUser.caloriasRestantes = this.user.calorias;
      this.newUser.proteinaRestante = this.user.proteinas;
      this.newUser.carbohidratoRestante = this.user.carbohidratos;
      this.newUser.grasaRestante = this.user.grasas;
      this.newUser.caloriasSemanales = this.user.calorias * 7;
      this.newUser.caloriasMensuales = this.user.calorias * 30;
      this.caloriasDiarias = this.newUser.caloriasDiarias;

      this.caloriasSemanales = this.newUser.caloriasSemanales;
      this.caloriasMensuales = this.newUser.caloriasMensuales;
      console.log("CalorìasMensuales_:", this.newUser.caloriasMensuales);
      this.newUser.proteinas = this.user.proteinas;
      this.newUser.carbohidratos = this.user.carbohidratos;
      this.newUser.grasas = this.user.grasas;
      this.storageService.addUser(this.newUser);
      res.set('proteinas', this.newUser.proteinas);
      res.set('carbohidratos', this.newUser.carbohidratos);
      res.set('grasas', this.newUser.grasas);
      res.set('calorias', this.newUser.calorias);
      //res.set('caloriasRestantes', this.newUser.caloriasRestantes);
      res.set('caloriasDiarias', this.newUser.caloriasDiarias);
      res.set('caloriasSemanales', this.newUser.caloriasSemanales);
      res.set('caloriasMensuales', this.newUser.caloriasMensuales);
      res.set('proteinaRestante', this.newUser.proteinaRestante);
      res.set('carbohidratoRestante', this.newUser.carbohidratoRestante);
      res.set('grasaRestante', this.newUser.grasaRestante);

      res.save();
      this.calcularCalorias();
      this.showToast("Datos cargados " + this.username);
      //console.log("Calorias2"+this.newUser.proteinas)
      //console.log("Calorias2"+this.user.proteinas);
    });


    //console.log("ID: ",this.user.id);
    //});
  }

  ///UPDATE
  updateUserData(item: Persona) {
    item.peso = item.peso + this.nuevoPeso;
    item.modified = Date.now();

    this.storageService.updateUserDetails(item).then(item => {
      this.showToast('•Alimento actualizado!');
      //this.mylist.closeSlidingItems();
      //this.loadUserData();
    });
  }
  ///DELETE
  deleteUserData(item: Persona) {
    //this.isenabled=false;
    this.storageService.deleteUserDetails(item.id).then(item => {
      //this.loadUserData();
      this.proteina = 0;
      this.contarCalorias();
      this.showToast('Datos de usuario eliminados!!');
      this.loadUserData();

    });
  }


  //TO LOAD HEALTH INFO



  //SHOWTOAST
  async showToast(msg) {
    const toast = await this.toastController.create({
      header: 'Recargando datos de usuario:',
      message: msg,
      translucent: true,
      position: 'middle',
      duration: 2000,
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
    //this.loadUserData();
    //this.contarCalorias();
  }

}
