import { Injectable } from '@angular/core';
import { Health } from '@ionic-native/health/ngx';

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor(private health: Health) {  this.health.isAvailable()
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
    .catch(e => console.log(e));}

 
}
