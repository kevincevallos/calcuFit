import { Component, OnInit } from '@angular/core';
import { StorageService, Alimento, Plato } from "../service/storage.service";
import { ModalController, ToastController } from '@ionic/angular';
import Parse from 'parse';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.page.html',
  styleUrls: ['./alimento.page.scss'],
})
export class AlimentoPage implements OnInit {

  items: Alimento[] = [];
  calories:number;
  newAlimento: Alimento = <Alimento>{};
  newPlato: Plato = <Plato>{};


  constructor(private modalCtrl:ModalController,
              private storageService: StorageService,
              private toastController: ToastController,
              private vibration:Vibration) { 


  }

  calcularCalorias(){ 
    this.newAlimento.calorias=(this.newAlimento.proteinas*4)+(this.newAlimento.carbohidratos*4)+(this.newAlimento.grasas*9);
  }
  ///CREATEB4App
agregarAlimento(){
const Alimentos = Parse.Object.extend('Alimentos');
const myNewObject = new Alimentos();

myNewObject.set('nombreAlimento', this.newAlimento.nombreAlimento);
myNewObject.set('pesoAlimento', this.newAlimento.pesoAlimento);
myNewObject.set('proteinas', this.newAlimento.proteinas);
myNewObject.set('carbohidratos', this.newAlimento.carbohidratos);
myNewObject.set('grasas', this.newAlimento.grasas);
const cal = (this.newAlimento.proteinas*4)+(this.newAlimento.carbohidratos*4)+(this.newAlimento.grasas*9);
myNewObject.set('calorias', cal);
myNewObject.set('dieta', 0);
myNewObject.set('colaborativo', 1);
if (this.newAlimento.nombreAlimento && this.newAlimento.proteinas &&
    this.newAlimento.carbohidratos && this.newAlimento.grasas &&
    this.newAlimento.pesoAlimento) {
   myNewObject.save();
   this.showToast("!Alimento Guardado Correctamente");
   this.newAlimento.nombreAlimento="";
   this.newAlimento.pesoAlimento=null;
   this.newAlimento.proteinas=null;
   this.newAlimento.carbohidratos=null;
   this.newAlimento.grasas=null;

}
else{
  this.showToast("Ingresa todos los datos de tu alimento");
}
 
}

agregarPlato(){
  const Platos = Parse.Object.extend('Platos');
  const myNewObject = new Platos();
  
  myNewObject.set('nombrePlato', this.newPlato.nombrePlato);
  myNewObject.set('pesoPlato', this.newPlato.pesoPlato);
  myNewObject.set('cantidadProteina', this.newPlato.cantidadProteina);
  myNewObject.set('cantidadCarbohidrato', this.newPlato.cantidadCarbohidrato);
  myNewObject.set('cantidadGrasa', this.newPlato.cantidadGrasa);
  const cal = (this.newPlato.cantidadProteina*4)+(this.newPlato.cantidadCarbohidrato*4)+(this.newPlato.cantidadGrasa*9);
  myNewObject.set('calorias', cal);
  myNewObject.set('dieta', 0);
  myNewObject.set('colaborativo', 1);
  if (this.newPlato.nombrePlato && this.newPlato.pesoPlato &&
    this.newPlato.cantidadProteina && this.newPlato.cantidadCarbohidrato &&
     this.newPlato.cantidadGrasa) {
     myNewObject.save();
     this.showToast("!Plato de Comida Guardado Correctamente");
     this.newPlato.nombrePlato="";
     this.newPlato.pesoPlato=null;
    this.newPlato.cantidadProteina=null;
    this.newPlato.cantidadCarbohidrato=null;
    this.newPlato.cantidadGrasa=null;
  
  }
  else{
    this.showToast("Ingresa todos los datos de tu plato de comida");
  }
   
  }

  ///CREATE
  addAlimento(){
    this.newAlimento.modified = Date.now();
    this.newAlimento.id = Date.now();
    this.newAlimento.dieta = 0;
    this.calcularCalorias();
    this.storageService.addItem(this.newAlimento).then(item => {
      this.newAlimento = <Alimento>{};
      this.showToast('•Alimento añadido!');
      this.loadAlimento();
    })
  }
///READ
loadAlimento(){
  this.storageService.getItems().then(items => {
this.items = items;
  });
}

///UPDATE
updateAlimento(item: Alimento){
  //item.pesoAlimento = item.pesoAlimento+this.nuevoPeso;
  item.modified = Date.now();

  this.storageService.updateItem(item).then(item => {
    //this.showToast('•Alimento actualizado!');
    //this.mylist.closeSlidingItems();
    this.loadAlimento();
  });
}
///DELETE
deleteAlimento(item: Alimento) {
  this.storageService.deleteItem(item.id).then(item => {
    //this.showToast('item eliminado!!');
    //this.mylist.closeSlidingItems();
    this.loadAlimento();
  });
}


  cerrar(){
    this.vibration.vibrate(500);
    this.modalCtrl.dismiss();

  }

//SHOWTOAST
async showToast(msg){
  const toast = await this.toastController.create({
    header: 'Agregando a Alimentos:',
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

  ngOnInit() {
  }

}
