import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StorageService, Alimento, Plato } from "../../service/storage.service";
import { IonList, Platform, ToastController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ALIMENTOS } from 'src/app/data-alimentos';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { ModalController, IonMenu } from "@ionic/angular";
import { AlimentoPage } from "../../alimento/alimento.page";
import { BaseDatosLocalService } from 'src/app/base-datos-local.service';
import Parse from 'parse';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.page.html',
  styleUrls: ['./alimentos.page.scss'],
})
export class AlimentosPage implements OnInit {
  searchTerm: string = '';
  itemDieta: any = { id: '' };
  //alimentos = [];
  alimento = {};
  colab: boolean;
  idAlimento: number = 0;
  alimentos = ALIMENTOS;
  selectedMeal: Alimento;
  nuevoPeso: number;
  value: string;
  items: Alimento[] = [];
  platos: Plato[] = [];
  datosUsuario: Alimento[] = [];
  newItems: Alimento[] = [];
  textoBuscar = '';
  baseItems: any;
  res: any;
  meal: Alimento = <Alimento>{};
  newItem: Alimento = <Alimento>{};
  lbl: string;
  //@ViewChild('mylist', { static: false }) mylist: IonList;
  //@ViewChild('idDieta', {static: false}) idDieta: ElementRef;
  @ViewChild('someInput', { static: false }) someInput: ElementRef;
  isItemAvailable;
  databaseObj: SQLiteObject; // Database instance object
  name: string;
  name_model: string = ""; // Input field model
  row_data: any = [];
  row_data2: Alimento[] = []; // Table rows
  readonly database_name: string = "alimentos.db"; // DB name
  readonly table_name: string = "alimentos"; // Table name
  alimentobuscar: Alimento[] = [];
  idAlimentoDieta: number;
  ishidden: boolean;
  info: boolean = false;
  data: boolean = false;

  slideOptsTwo = {
    initialSlide: 0,
    slidesPerView: 2,
    loop: true,
  };
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3
  };
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    loop: true,
    autoplay: true,
    centeredSlides: true

  };
  user: any;
  userId: string;

  constructor(private storageService: StorageService,
    private plt: Platform,
    private vibration: Vibration,
    private toastController: ToastController,
    private router: Router,
    public alertController: AlertController,
    private modalController: ModalController,
    public navCtrl: NavController,
    private loadingController: LoadingController,
    private sqlite: SQLite) {

    //this.addDesayuno();
    //this.loadItems();
    //this.loadAlimentos();

  }


  createDB() {
    this.sqlite.create({
      name: this.database_name,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
        alert('freaky_datatable Database Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  createTable() {
    this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS ' + this.table_name + ' (pid INTEGER PRIMARY KEY, Name varchar(255))', [])
      .then(() => {
        alert('Table Created!');
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  insertRow() {
    if (!this.name_model.length) {
      alert("Enter Name");
      return;
    }
    this.databaseObj.executeSql('INSERT INTO ' + this.table_name + ' (Name) VALUES ("' + this.name_model + '")', [])
      .then(() => {
        alert('Row Inserted!');
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  getRows() {
    this.databaseObj.executeSql("SELECT * FROM " + this.table_name, [])
      .then((res) => {
        this.row_data = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.row_data.push(res.rows.item(i));
          }
        }
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  deleteRow(item) {
    this.databaseObj.executeSql("DELETE FROM " + this.table_name + " WHERE pid = " + item.pid, [])
      .then((res) => {
        alert("Row Deleted!");
        this.getRows();
      })
      .catch(e => {
        alert("error " + JSON.stringify(e))
      });
  }

  ionViewWillEnter() {
    this.data = false;


    //your code;   
    this.loadAlimentos();
    this.loadPlatos();
    this.vibration.vibrate(300);
    //this.lbl = document.getElementById('nombreDelAlimento').innerHTML;
    //console.log('lbl::_',this.lbl);
  }
  ionViewDidEnter() {
    //this.name = document.getElementById("nombreDelAlimento").appendChild.toString();
    setTimeout(() => {
      //this.someInput.nativeElement.value = "Anchovies! 🍕🍕";
      this.data = true;

    }, 2000);
  }
  async doRefresh(event) {
    this.vibration.vibrate(500);

    console.log('Begin async operation');
    this.info = false;
    const loading = await this.loadingController.create({
      message: 'Cargando Alimentos...'
    });
    await loading.present();
    setTimeout(() => {
      //this.loadItems();
      this.loadAlimentos();
      this.loadPlatos();
      console.log('Async operation has ended');
      event.target.complete();
      loading.dismiss();
    }, 2000);
  }

  async loadAlimentos() {
    this.items = [];
    Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    var Alimentos = new Parse.Object.extend("Alimentos");
    var query = new Parse.Query(Alimentos);
    await query.find()
      //query.get("HPzsOvhdqG")
      .then((alimento) => {
        for (let i = 0; i < alimento.length; i++) {
          const a = alimento[i].get('dieta');
          const b = alimento[i].get('colaborativo');
          console.log('dietaAlimentos:_', alimento[i].get('dieta'));
          if (a != 1) {
            this.items.push(alimento[i]);
          }
          if (b != 1) {
            this.colab = false;
          }

          //this.newItems.push(alimento[i]);
        }

      });


  }
  async loadPlatos() {
    this.platos = [];
    Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    var Platos = new Parse.Object.extend("Platos");
    var query = new Parse.Query(Platos);
    await query.find()
      .then((plato) => {
        for (let i = 0; i < plato.length; i++) {
          this.platos.push(plato[i]);
          const a = plato[i].get('dieta');
          const b = plato[i].get('colaborativo');
          console.log('dietaPlatos:_', plato[i].get('nombrePlato'));
          if (a != 1) {
          }
          if (b != 1) {
            this.colab = false;
          }

          //this.newItems.push(alimento[i]);
        }

      });


  }
  //back4AppMethods
  anadirDesayuno(event, item) {
    var mealName = item.get('nombreAlimento');
    var mealWeight = item.get('pesoAlimento');
    var mealProtein = item.get('proteinas');
    var mealCarbos = item.get('carbohidratos');
    var mealFat = item.get('grasas');
    var mealCal = item.get('calorias');
    Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.User.currentAsync().then(user => {
      this.userId = user.id;
      var Alimentos = new Parse.Object.extend("Alimentos");
      var alimentos = new Alimentos();
      var query = new Parse.Query(Alimentos);
      query.select("id");
      query.find().then(function (results) {
      });
      alimentos.set("id_usuario", this.userId);
      alimentos.set("desayuno", 1);
      alimentos.set("nombreAlimento", mealName);
      alimentos.set("pesoAlimento", mealWeight);
      alimentos.set("proteinas", mealProtein);
      alimentos.set("carbohidratos", mealCarbos);
      alimentos.set("grasas", mealFat);
      alimentos.set("calorias", mealCal);
      alimentos.set("dieta", 1);
      alimentos.save()
    })
      .then((alimento) => { });
    this.newItem.nombreAlimento = mealName;
    this.newItem.proteinas = mealProtein;
    this.newItem.carbohidratos = mealCarbos;
    this.newItem.grasas = mealFat;
    this.newItem.calorias = mealCal;
    this.newItem.pesoAlimento = mealWeight;
    this.storageService.addMyItem(this.newItem);
    this.showToast("Alimento " + mealName + " agregado al desayuno");
  }
  
  anadirAlmuerzo(event, item) {
    var mealName = item.get('nombreAlimento');
    var mealWeight = item.get('pesoAlimento');
    var mealProtein = item.get('proteinas');
    var mealCarbos = item.get('carbohidratos');
    var mealFat = item.get('grasas');
    var mealCal = item.get('calorias');

    Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.User.currentAsync().then(user => {

      this.userId = user.id
      console.log("this.userId:_" + this.userId);


      var Alimentos = new Parse.Object.extend("Alimentos");
      var alimentos = new Alimentos();
      var query = new Parse.Query(Alimentos);
      query.select("id");
      query.find().then(function (results) {
        console.log("results:_", results);

      });
      alimentos.set("id_usuario", this.userId);
      alimentos.set("almuerzo", 1);
      alimentos.set("nombreAlimento", mealName);
      alimentos.set("pesoAlimento", mealWeight);
      alimentos.set("proteinas", mealProtein);
      alimentos.set("carbohidratos", mealCarbos);
      alimentos.set("grasas", mealFat);
      alimentos.set("calorias", mealCal);
      alimentos.set("dieta", 1);
      alimentos.save()
    })
      .then(() => { });

    this.newItem.nombreAlimento = mealName;
    this.newItem.proteinas = mealProtein;
    this.newItem.carbohidratos = mealCarbos;
    this.newItem.grasas = mealFat;
    this.newItem.calorias = mealCal;
    this.newItem.pesoAlimento = mealWeight;
    this.storageService.addMyItem(this.newItem);

    this.showToast("Alimento " + mealName + " agregado al almuerzo");

  }
  anadirMerienda(event, item) {
    var mealName = item.get('nombreAlimento');
    var mealWeight = item.get('pesoAlimento');
    var mealProtein = item.get('proteinas');
    var mealCarbos = item.get('carbohidratos');
    var mealFat = item.get('grasas');
    var mealCal = item.get('calorias');
    var mealDiet = item.get('dieta');
    Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.User.currentAsync().then(user => {

      this.userId = user.id
      console.log("this.userId:_" + this.userId);


      var Alimentos = new Parse.Object.extend("Alimentos");
      var alimentos = new Alimentos();
      var query = new Parse.Query(Alimentos);
      query.select("id");
      query.find().then(function (results) {
        console.log("results:_", results);

      });
      alimentos.set("id_usuario", this.userId);
      alimentos.set("merienda", 1);
      alimentos.set("nombreAlimento", mealName);
      alimentos.set("pesoAlimento", mealWeight);
      alimentos.set("proteinas", mealProtein);
      alimentos.set("carbohidratos", mealCarbos);
      alimentos.set("grasas", mealFat);
      alimentos.set("calorias", mealCal);
      alimentos.set("dieta", 1);
      alimentos.save()
    })
      .then(() => { });
    this.newItem.nombreAlimento = mealName;
    this.newItem.proteinas = mealProtein;
    this.newItem.carbohidratos = mealCarbos;
    this.newItem.grasas = mealFat;
    this.newItem.calorias = mealCal;
    this.newItem.pesoAlimento = mealWeight;
    this.storageService.addMyItem(this.newItem);

    this.showToast("Alimento " + mealName + " agregado a la merienda");

  }


  buscar(event) {

    const texto = event.target.value;
    this.textoBuscar = texto;
    console.log(this.textoBuscar);
    console.log(texto);
  }


  /*buscar(event: CustomEvent){
    console.log(event);
    this.alimentobuscar = event.detail.value;
    const x = this.alimentobuscar;
    let val = event.detail.value;
    console.log("ESTO ES X: ",x);
    console.log("esto es val:",val);
  
    if (event.detail.value !== '') {
      return this.items.filter(el => el.nombreAlimento.toLowerCase().indexOf(this.searchTerm.toLowerCase()) !== -1);
  
            this.isItemAvailable = true;
        console.log("entrqa al if");
        console.log(this.alimentobuscar);
    }
  
  }*/

  setFilteredItems() {
    this.alimentobuscar = this.filterItems(this.searchTerm);
  }



  filterItems(searchTerm) {
    return this.items.filter((item) => {
      return item.nombreAlimento.toLowerCase().indexOf(
        searchTerm.toLowerCase()) > -1;
    });
  }

  /*getItems(ev) {
    // Reset items back to all of the items
    this.searchItems = this.items;
    // set val to the value of the searchbar
    const val = ev.detail.value;
  
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
  
      this.searchItems = this.searchItems.filter(item => {
        return item.nombreAlimento.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
    //esconder lista de búsqueda
    if (val.trim() == '') {
      this.isItemAvailable = false;
    }
  
  }*/

  //infoItem
  infoItem(event, item) {
    alert('Open ' + item.id);
    console.log(event);
    if (this.info) {
      this.info = false;
    } else {
      this.info = true
    }

  }

  ///CREATE
  addToDiet() {
    this.newItem.dieta = 1;
    console.log("NEW ITEM:  " + this.newItem);
    this.storageService.addMyItem(this.newItem).then(() => {
      this.newItem = <Alimento>{};
      this.showToast(' •Alimento añadido!');
      //this.loadItems();
    })
  }

  addDesayuno() {
    //this.newDesayuno.id_usuario = 1;
    //this.storageService.setAlimentosDesayuno();
    console.log("addDesayuno!!_");
  }

  addItem() {
    const b = document.getElementById('idComida').textContent;
    this.newItem = <Alimento>{};
    this.newItem.modified = Date.now();
    //var b='';
    for (let x = 0; x < this.items.length; x++) {
      var a = this.items[x].id;
      console.log('AddItem()_a:', a)
      //var a = this.items[x].id;
      //this.newItem.id = a;
      this.storageService.addItem(this.newItem);
      //console.log('mensajeDOS_:', this.items[x].get('objectId'));
      //console.log('mensajeNombreAlimento:_', this.newItem.nombreAlimento);

    }

    //this.storageService.addItem(this.newItem).then(item => {

    //this.newItem.nombreAlimento=item
    /*for (const i in item) {
      console.log('mensajeFOR:__', this.items[i].get('nombreAlimento'));
      this.newItem.nombreAlimento = this.items[i].get('nombreAlimento');
      console.log("THIS_ITEMS:_" + this.items[i]);
    }
    for (let i = 0; i < item.length; i++) {
      const a = item[i];
      console.log("a:_" + item[i]);

      this.items.push(item[i]);
      //this.newItems.push(item[i]);
    }
    console.log("Item_:" + item);*/
    this.showToast(' •Alimento añadido!');
    //this.loadItems();
    //})
  }
  ///READ
  async loadItems() {
    this.storageService.getMyItems().then(items => {
      this.datosUsuario = items;
      console.log("Mi Diario de Dieta_:", items);

      //this.meal = items;
      //this.meal.calorias = this.meal.proteinas;
    });
  }

  ///UPDATE
  updateItem(item: Alimento) {
    //item.pesoAlimento = item.pesoAlimento+this.nuevoPeso;
    this.info = true;
    item.modified = Date.now();
    item.dieta = 1;

    this.storageService.updateItem(item).then(item => {
      this.loadItems();
      this.showToast('•Alimento actualizado!');
      //this.mylist.closeSlidingItems();
    });
  }
  ///DELETE
  deleteItem(item: Alimento) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast("item.get('nombreAlimento'),'eliminado de la dieta'");
      //this.mylist.closeSlidingItems();
      this.loadItems();
    });
  }

  addNewItem() {
    this.ishidden = false;
  }

  ///MODALS
  async agregarAlimento() {
    this.vibration.vibrate(500);
    const modal = await this.modalController.create({

      component: AlimentoPage,
      componentProps: {
      }
    });

    return await modal.present();

  }

  //SHOWTOAST
  async showToast(msg) {
    const toast = await this.toastController.create({
      header: 'Agregando a mi dieta:',
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

  onSelect(alimento: Alimento): void {
    this.selectedMeal = alimento;
  }


  ngOnInit() {
    //this.databaseService.llenarBase();
    //this.loadItems();
    //this.setFilteredItems();
  }

}
