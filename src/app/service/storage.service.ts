import { Injectable } from '@angular/core';
import { Http, HttpModule } from "@angular/http";
import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import Parse from 'parse';
export interface miAlimento 
    {
     nombreAlimento: string,
       dieta: any,
      createdAt: any,
      updatedAt: any,
       pesoAlimento: any,
     proteinas: any,
     carbohidratos: any,
     grasas: any,
      calorias: any,
     objectId: any
    }
    export interface Alimento {
      id: number;
      nombreAlimento: string;
      pesoAlimento: number;
      proteinas: number;
      carbohidratos: number;
      grasas:number;
      calorias: number;
      dieta: number;
      modified: number;
    }
    export interface Plato {
      id: number;
      nombrePlato: string;
      pesoPlato: number;
      nombreProteina: string;
      cantidadProteina: number;
      nombreCarbohidrato: string;
      cantidadCarbohidrato: number;
      nombreGrasa: string;
      cantidadGrasa: number;
      calorias: number;
      dieta: number;
      modified: number;
    }
export interface Credenciales {
  nombreUsuario: string;
  contrasenaUsuario: string;
}
export interface Persona {
  id: number;
  genero: string;
  peso: number;
  altura: number;
  edad: number;
  pesoIdeal: number;
  proteinas: number;
  proteinaRestante:number;
  carbohidratos: number;
  carbohidratoRestante:number;
  grasas:number;
  grasaRestante:number;
  calorias: number;  
  caloriasRestantes: number;
  caloriasDiarias: number;
  caloriasSemanales: number;
  caloriasMensuales: number;
  modified: number;
  actividadDiaria: string;
  objetivo: string;
}

const DB_MEALS_KEY = 'meals';
const MY_MEALS_KEY = 'my_meals';

const USERS_KEY = 'my_users';
const USERS_DETAILS_KEY = 'my_users_details';
const CRD_KEY = 'credential_keys';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  platform: any;
  statusBar: any;
  splashScreen: any;

  constructor(private storage: Storage,
    public sqlite: SQLite) {
    }

  //CRUD BACK4APP IMPLEMENTATION
  //CREAR ALIMENTO
  setAlimentosDesayuno() {

    Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
    Parse.serverURL = 'https://parseapi.back4app.com/';
    var Desayuno = Parse.Object.extend("Desayuno");
    var desayuno = new Desayuno();

    var Alimentos = new Parse.Object.extend("Alimentos");
    var alimentos = new Alimentos();
    alimentos.save({
      id_usuario:1
    })
    //query.get("HPzsOvhdqG")
    .then((alimento) => {
      console.log('Desayuno_:',alimento);
    },
    (error) => {
      console.log("error"+error);
 });
    }
  //LEER ALIMENTO
  getAlimentosData() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      Parse.initialize("r225XNan3PNl1kbzXMeKWAMvXv7Jqpumw1yga4xQ", "Gs7aUiQuj722tXc0jLyNt8PKztIs2V5Q09DWoi1p");
      Parse.serverURL = 'https://parseapi.back4app.com/';
      var Alimentos = new Parse.Object.extend("Alimentos");
      var query = new Parse.Query(Alimentos);
      query.find()
      //query.get("HPzsOvhdqG")
      .then((alimento) => {
        console.log(alimento);
      },
      (error) => {
        console.log("error"+error);
   });
    });
  }

  //ACTUALIZAR ALIMENTO
  updateAlimentosData() {
  }
  //BORRAR ALIMENTO
  deleteAlimentosData() {
  }



  //CRUD FUNCTIONS For DB Alimentos
  addItem(item: Alimento){
    return this.storage.get(DB_MEALS_KEY).then((items: Alimento[]) =>{
      if (items) {
        items.push(item);
        console.log('storageService:_',item);
        return this.storage.set(DB_MEALS_KEY, items);
      } else {
        return this.storage.set(DB_MEALS_KEY, [item]);        
      }
    });
  }
  reloadDataAlimentos(){

    

  }
  getItems() {
    return this.storage.get(DB_MEALS_KEY);
  }

  updateItem(item: Alimento){
return this.storage.get(DB_MEALS_KEY).then((items: Alimento[]) =>{
  if (!items || items.length === 0) {
    return null;
  }

  let newItems: Alimento[] = [];

  for (let i of items) {
    if (i.id === item.id) {
      newItems.push(item);
    } else {
      newItems.push(i);
    }
  }
  return this.storage.set(DB_MEALS_KEY, newItems);
  });
  }

  deleteItem(id: number){
    return this.storage.get(DB_MEALS_KEY).then((items: Alimento[])=>{
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: Alimento[] = [];

      for(let i of items){
        if (i.id !== id) {
          toKeep.push(i);          
        }
      }
      return this.storage.set(DB_MEALS_KEY, toKeep);
    });
  }



 //CRUD FUNCTIONS For MY Alimentos
 addMyItem(item: Alimento){
  return this.storage.get(MY_MEALS_KEY).then((items: Alimento[]) =>{
    if (items) {
      items.push(item);
      return this.storage.set(MY_MEALS_KEY, items);
    } else {
      return this.storage.set(MY_MEALS_KEY, [item]);        
    }
  });
}

getMyItems() {
  return this.storage.get(MY_MEALS_KEY);
}

updateMyItem(item: Alimento){
return this.storage.get(MY_MEALS_KEY).then((items: Alimento[]) =>{
if (!items || items.length === 0) {
  return null;
}

let newItems: Alimento[] = [];

for (let i of items) {
  if (i.id === item.id) {
    newItems.push(item);
  } else {
    newItems.push(i);
  }
}
return this.storage.set(MY_MEALS_KEY, newItems);
});
}

deleteMyItem(id: number){
  return this.storage.get(MY_MEALS_KEY).then((items: Alimento[])=>{
    if (!items || items.length === 0) {
      return null;
    }

    let toKeep: Alimento[] = [];

    for(let i of items){
      if (i.id !== id) {
        toKeep.push(i);          
      }
    }
    return this.storage.set(MY_MEALS_KEY, toKeep);
  });
}
 //CRUD CREDENTIALS
  addUserCredentials(item: Credenciales){
    return this.storage.get(CRD_KEY).then((items: Credenciales[]) =>{
      if (items) {
        items.push(item);
        return this.storage.set(CRD_KEY, items);
      } else {
        return this.storage.set(CRD_KEY, [item]);        
      }
    });
  }
   //CRUD FUNCTIONS For Personas
   addUserDetails(item: Persona){
    return this.storage.get(USERS_DETAILS_KEY).then((items: Persona[]) =>{
      if (items) {
        items.push(item);
        console.log("StorageLogIn:_"+item);
        return this.storage.set(USERS_DETAILS_KEY, items);
      } else {
        return this.storage.set(USERS_DETAILS_KEY, [item]);        
      }
    });
  }
  addUser(item: Persona){
    return this.storage.get(USERS_KEY).then((items: Persona[]) =>{
      if (items) {
        items.push(item);
        console.log("StorageService_addUser:_"+item);
        return this.storage.set(USERS_KEY, items);
      } else {
        return this.storage.set(USERS_KEY, [item]);        
      }
    });
  }

 

  getUser() {
    return this.storage.get(USERS_KEY);
  }

  updateUserDetails(item: Persona){
return this.storage.get(USERS_KEY).then((items: Persona[]) =>{
  if (!items || items.length === 0) {
    return null;
  }

  let newItems: Persona[] = [];

  for (let i of items) {
    if (i.id === item.id) {
      newItems.push(item);
    } else {
      newItems.push(i);
    }
  }
  return this.storage.set(USERS_KEY, newItems);
  });
  }

  deleteUserDetails(id: number){
    return this.storage.get(USERS_KEY).then((items: Persona[])=>{
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: Persona[] = [];

      for(let i of items){
        if (i.id !== id) {
          toKeep.push(i);          
        }
      }
      return this.storage.set(USERS_KEY, toKeep);
    });
  }
}
