import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, Platform, ToastController, IonList, IonSlides, IonFabList } from '@ionic/angular';
import { ListService } from '../../service/list.service';
import { StorageService, Alimento } from "../../service/storage.service";
import { Options } from 'selenium-webdriver/chrome';
import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import * as _ from 'lodash';
import Parse from 'parse';



@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.page.html',
  styleUrls: ['./dieta.page.scss'],
})
export class DietaPage implements OnInit {

  items: Alimento[] = [];
  desayuno: Alimento[] = [];
  almuerzo: Alimento[] = [];
  merienda: Alimento[] = [];
  newAlimento: Alimento = <Alimento>{};
  newAlimento2: Alimento = <Alimento>{};
  newItem: Alimento = <Alimento>{};
  userId: string;
  desayunoCheck:boolean=false;
  almuerzoCheck:boolean=false;
  meriendaCheck:boolean=false;
  desayunoCal:number;
  almuerzoCal:number;
  meriendaCal:number;
  @ViewChild('mylist', { static: false }) mylist: IonList;

  item: any;
  tabIndex: number;
  itemIndex: number;
  buttons: Array<string>;
  databaseObj: SQLiteObject;
  readonly table_name: string = "alimentos"; // Table name
  readonly database_name: string = "alimentos.db"; // DB name
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  slideOptsTwo = {
    initialSlide: 1,
    slidesPerView: 2,
    loop: true,
    centeredSlides: true
  };
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3
  };
  data: boolean = false;
  constructor(private storageService: StorageService,
    private plt: Platform,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    public alertController: AlertController,
    private ListService: ListService,
    private sqlite: SQLite) {
      //this.desayunoCheck=false;
      //this.almuerzoCheck=false;
      //this.meriendaCheck=false;

    //this.loadItems();


    /*   
this.sqlite.create({name: this.database_name, location: "default"}).then((db : SQLiteObject) => {
this.databaseObj = db;
console.log("successful!!DDBB CREATED");
}, (error) => {
console.log("ERROR: ", error);
});
*/
  }
  ionViewWillEnter() {
    //your code;   
    this.data = true;
    this.loadAlimentos();
    setTimeout(() => {    
    }, 1000);
  }
  ionViewDidEnter() {

    setTimeout(() => {
      this.data = false;

    }, 1000);
  }

  checkDesayuno(){
    this.desayunoCheck=true;
    this.almuerzoCheck=false;
    this.meriendaCheck=false;

  }
  checkAlmuerzo(){
    this.desayunoCheck=false;
    this.almuerzoCheck=true;
    this.meriendaCheck=false;

  }
  checkMerienda(){
    this.desayunoCheck=false;
    this.almuerzoCheck=false;
    this.meriendaCheck=true;
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.loadAlimentos();
    setTimeout(() => {
      //this.items.unshift(...this.newItems);
      //this.newItems = [];
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  //Back4App Methods
  async loadAlimentos() {
    //this.items = [];
    this.desayuno = [];
    this.almuerzo = [];
    this.merienda = [];
    Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    var Alimentos = new Parse.Object.extend("Alimentos");
    var query = new Parse.Query(Alimentos);
    Parse.User.currentAsync().then(async user => {
      //query.equalTo("id_usuario",this.userId)



      this.userId = user.id;
      console.log("this.userId:_" + this.userId);
      query.equalTo("id_usuario",user.id)
      await query.find()


        //query.get("HPzsOvhdqG")
        .then((alimento) => {
          //console.log('TAMAÑOALIMENTO_:',alimento.length)
          for (let i = 0; i < alimento.length; i++) {
            const desayuno = alimento[i].get('desayuno');
            const almuerzo = alimento[i].get('almuerzo');
            const merienda = alimento[i].get('merienda');
            const id = alimento[i].get('id_usuario');
            //console.log('id_usuario-ConsoleLog:_' , alimento[i].get('id_usuario'));
            if (desayuno == 1 && id == this.userId) {
              let res;
              let res2;
              let uno=1;
              this.desayuno.push(alimento[i]);
              res = alimento[i].get('calorias');
              res2 = alimento[i].get('calorias');
              this.desayunoCal = this.desayunoCal + res;
              
              //console.log("res_:",res,this.desayunoCal);
            }
            if (almuerzo == 1 && id == this.userId) {
              let res;
              let res2;
              let uno=1;
              this.almuerzo.push(alimento[i]);
              res = alimento[i].get('calorias');
              res2 = alimento[i].get('calorias');
              this.almuerzoCal = res + res2;
              //console.log("i_almuerzo_:",i);
            }
            if (merienda == 1 && id == this.userId) {
              let res;
              let res2;
              let uno=1;              
              this.merienda.push(alimento[i]);
              res = alimento[i].get('calorias');
              res2 = alimento[i].get('calorias');
              this.meriendaCal = res + res2;
              //console.log("i_merienda_:",i);
            }
          }

        });
    })
  }
  //Delete Desayuno
  deleteItem(event, item) {
    var id = item.id;
    Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    var Alimentos = new Parse.Object.extend("Alimentos");
    var query = new Parse.Query(Alimentos);
    query.get(id).then((object) => {
      object.destroy();
      this.loadAlimentos();
      this.showToast("Alimento "+object.get('nombreAlimento')+" eliminado ");
    })


    console.log("Id:_",id);
  }
  ///CREATE
  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Alimento>{};
      this.showToast(' •Alimento añadido!');
      this.loadItems();
    })
  }
  ///READ
  async loadItems() {
    this.items = [];
    this.storageService.getItems().then((item) => {
      this.items.push(item);

      //this.items2 = it;
      //this.items2.length=0;




      /*var evens = _.remove(array, function (n) {
        return n % 1 === 0;
      });*/
      //console.log("EL ARRAY:_"+array);
      // => [1, 3]

      //console.log("el evens_:"+evens);
      // => [2, 4]

      //console.log("This.Item: " + it[element]);



      //var str = () => '1';
      // let var2: boolean = this.items.includes(diet);

      //console.info(this.items.includes(diet));


      //console.log("DIETA: "+this.newAlimento.dieta);
      //const diet = this.newAlimento.dieta;

      //console.log("ELEMENTOSFOR: "+element);
      //console.log(`items.${element} = ${items[element]}`);


      //console.log("ITEMS2:_"+this.items2);

    });
  }


  loadAll() {
    this.loadItems();
  }

  ///UPDATE
  updateItem(item: Alimento) {
    item.nombreAlimento = item.nombreAlimento;
    item.modified = Date.now();
    item.dieta = 0;

    this.storageService.updateItem(item).then(item => {
      this.loadItems();
      this.showToast('•Alimento actualizado!');
      this.mylist.closeSlidingItems();
    });
  }
  ///DELETE
  /*deleteItem(item: Alimento) {
    this.storageService.deleteItem(item.id).then(item => {
      this.loadItems();
      this.showToast("'item.get('nombreAlimento')','eliminado de la dieta'");
      //this.mylist.closeSlidingItems();
      //this.loadItems();
    });
  }*/

  //SHOWTOAST
  async showToast(msg) {
    const toast = await this.toastController.create({
      header: 'Actualizando mi dieta:',
      message: msg,
      translucent: true,
      position: 'top',
      duration: 3000,
      buttons: [
        {
          side: 'start',
          icon: 'pizza'
        }, {
          side: 'end',
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }



  async error(message) {
    const alert = await this.alertController.create({
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  save() {
    if (!this.item.task.length) {
      this.error('The task cannot be empty');
    }
    else {
      if (this.itemIndex >= 0) {
        this.ListService.setItem(this.tabIndex, this.item, this.itemIndex);
      }
      else {
        this.ListService.setItem(this.tabIndex, this.item);
      }
      this.router.navigate(['/home']);
    }
  }


  ngOnInit() {

    //this.loadItems();

  }

 
}
