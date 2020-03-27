import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';

//import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Storage } from "@ionic/storage";
import { Http } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
//import 'rxjs/add/operator/map'
import { map, filter, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BaseDatosLocalService {
 // Array donde se almacenará la información contenida en la BD
 datos: any = [];
 // Variable que se usará con subscribe para detectar BD preparada 
 private databaseReady: BehaviorSubject<boolean>;
  
 private database : SQLiteObject;
 //private databaseReady: BehaviorSubject<boolean>;
 //private DB_NAME : string = "comida.db";

  constructor(public http: HttpClient, private platform: Platform, 
    private sqlite: SQLite, private sqliteporter: SQLitePorter, 
    private alertCtrl: AlertController,
    private storage: Storage) {
     /* this.databaseReady = new BehaviorSubject(false);
      this.platform.ready().then(() => {
         
         this.sqlite.create({
         name:'alimentos.db',
         location: 'default'
         })
         .then((db: SQLiteObject) =>{
            this.database = db;
            this.storage.get('database_filled').then(val => {
               if (val) {
                  this.databaseReady.next(true);
               } else {
                  this.llenarBase();
               }
            })
         });
      });
      //this.abrirBaseDatos();
      //this.abrirBdd();
      //this.func();*/
     }

     llenarBase() {
        this.http.get<string>('assets/CrearBaseDatos.sql')
        .subscribe(sql => {
           this.sqliteporter.importSqlToDb(this.database, sql)
           .then(data => {
              this.databaseReady.next(true);
              this.storage.set('database_filled',true);
           })
           .catch(e => console.log(e));
        });
     }

     añadirAlimento(name, description){
        let data = [name, description];
        return this.database.executeSql("INSERT INTO alimentos (name, description) VALUES (?, ?, ?)", data).then(res => {
           return res;
        });
     }

     getAlimentos(){
        return this.database.executeSql("SELECT * FROM alimentos", []).then(data => {
         let developers = [];
         if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++){
               developers.push({name: data.rows.item(i).name, description: data.rows.item(i).description});
            }
         }
         return developers;
         }, err => {
            console.log('Error: ', err);
            return [];
        })
     }





    /* dataExistsCheck(tableName : string) : Promise<string>
   {
      return new Promise((resolve, reject) =>
      {
         this.DB.executeSql('SELECT count(*) AS numRows FROM ' + tableName, [])
         .then((data : any) =>
         {
            var numRows = data.rows.item(0).numRows;
            resolve(numRows);
         })
         .catch((e) =>
         {
            reject(e);
         });
      });
   }*/


/*

   retrieveAllRecords() : Promise<string>
   {
      return new Promise((resolve, reject) =>
      {

         this.DB.executeSql('SELECT id, name, description FROM technologies', [])
         .then((data : any) =>
         {
            let items : any 	= [];
            if(data.rows.length > 0)
            {
               var k;

               // iterate through returned records and push as nested objects into
               // the items array
               for(k = 0; k < data.rows.length; k++)
               {
                  items.push(
                  {
	                 id 			    : data.rows.item(k).id,
	                 name 			    : data.rows.item(k).name,
	                 description 	    : data.rows.item(k).description
                  });
               }
            }
            resolve(items);
         })
         .catch((error : any) =>
         {
            reject(error);
         });

      });
   }




   importSQL(sql 	: any) : Promise<string>
   {
      return new Promise((resolve, reject) =>
      {
         this.sqliteporter.importSqlToDb(this.DB, sql)
         .then((data) =>
         {
            resolve(data);
         })
         .catch((e) =>
         {
            reject(e);
         });
      });
   }





   exportAsSQL() : Promise<string>
   {
      return new Promise((resolve, reject) =>
      {
         this.sqliteporter
         .exportDbToSql(this.DB)
         .then((data) =>
         {
            resolve(data);
         })
         .catch((e) =>
         {
            reject(e);
         });
      });
   }





   importJSON(json : any) : Promise<string>
   {
      return new Promise((resolve, reject) =>
      {
         this.sqliteporter
         .importJsonToDb(this.DB, json)
         .then((data) =>
         {
            resolve(data);
         })
         .catch((e) =>
         {
            reject(e);
         });
      });
   }




  
   clear() : Promise<string>
   {
      return new Promise((resolve, reject) =>
      {
         this.sqliteporter
         .wipeDb(this.DB)
         .then((data) =>
         {
            resolve(data);
         })
         .catch((error) =>
         {
            reject(error);
         });
      });
   }

     func(){
        // Define the application SQLite database
        this.sqlite.create({
          name 		  : this.DB_NAME,
          location 	  : 'default'
       })
       .then((db: SQLiteObject) =>
       {
          // Associate the database handler object with the _DB private property
          this.DB = db;
       })
       .catch((e) =>
       {
          console.log(e);
       });
     }
*/

     abrirBdd(){
       let storage: SQLite = new SQLite();
      //let db = storage.openDatabase('Test', '1.0', 'TestDB', 1 * 1024);
      // or we can use SQLite plugin
      // we will assume that we injected SQLite into this component as sqlite
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
        .then((db: any) => {
          let dbInstance = db._objectInstance;
          // we can pass db._objectInstance as the database option in all SQLitePorter methods
        });
      
      
      let sql = 'CREATE TABLE Artist ([Id] PRIMARY KEY, [Title]);' +
                 'INSERT INTO Artist(Id,Title) VALUES ("1","Fred");';
      
      //this.sqliteporter.importSqlToDb(db, sql)
        //.then(() => console.log('Imported'))
        //.catch(e => console.error(e));

     }

    /* abrirBaseDatos() {
      // Make ready to platform
      this.platform.ready()
        .then(() => {
          // Crear o abrir la base de datos MiAppBD.db
          this.sqlite.create({
            name: 'MiAppBD.db',
            location: 'default'
          })
            .then((db: SQLiteObject) => {
              // Consulta para comprobar si ya existen los datos
              db.executeSql('SELECT * FROM tableItems', [])
                .then(res => {
                  // Los datos ya estaban en la BD
                  this.alertCtrl.create({ 
                    header: "Información",
                    message: 'Los datos ya estaban en la BD',
                    buttons: ['Aceptar']
                  }).catch();
                  // Procesar los datos de la base de datos
                  this.datos = this.obtenerDatos(db);
                  // Informar que la base de datos está lista
                  this.databaseReady.next(true);
                }) 
                .then(res => {
                  // Los datos no están en la BD. Hay que importarlos
                  this.alertCtrl.create({
                    header: 'Información',
                    message: 'Se van a importar los datos a la BD',
                    buttons: ['Aceptar']
                  }).catch();
                  // Obtener el archivo que contiene las sentencias SQL
                  this.http.get('assets/CrearBaseDatos.sql')
                    .pipe(res => res)
                    .subscribe(sql => {
                      // Ejecutar las sentencias SQL del archivo
                      this.sqliteporter.importSqlToDb(db, sql)
                        .then(() => {
                          // Procesar los datos de la base de datos
                          this.datos = this.obtenerDatos(db);
                          // Informar que la base de datos está lista
                          this.databaseReady.next(true);
                        }).catch(e => {
                          alert("Error al importar la base de datos");
                          console.error("Error al importar la base de datos", e.message);
                        });
                    })
                });
            });
        }).catch(e => alert('Platform is not ready.'));    
    }*/
  
    obtenerDatos(baseDatos) {
      let resultado = [];
      // Realizar la consulta a la BD para extraer los datos
      baseDatos.executeSql('SELECT * FROM tableItems', [])
        .then(resSelect => {
          // Recorrer todas las filas obtenidas
          for (var i = 0; i < resSelect.rows.length; i++) { 
            // Añadir al array de datos la información desglosada
            resultado.push({ 
              unTextoCorto: resSelect.rows.item(i).unTextoCorto, 
              unTextoLargo: resSelect.rows.item(i).unTextoLargo 
            });
          } 
        }).catch(e => {
          alert("Error: No se ha podido consultar los datos",);
          console.error("Error en Select de consulta de datos", e.message);
        });
      return resultado;
    }
  
    /*
    * Método para obtener el Observable que se utilizará con susbcribe
    * para detectar cuándo está lista la base de datos
    */
    getDatabaseState() {
      return this.databaseReady.asObservable();
    }



}
