import { Component, OnInit } from '@angular/core';
import { NavController, ToastController} from "@ionic/angular";
import Parse from 'parse';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from "ngx-qrcode2";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  isLoggedIn:boolean;
  rootPage: any;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public router: Router,
    private barcodeScanner: BarcodeScanner,
    private ngxCodeModule: NgxQRCodeModule) {
      this.encodeData = "www.google.com";
      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      };
     }

    createCode(){
      this.createdCode = this.qrData;
    
 }

    scanCode(){
      this.barcodeScanner.scan().then(data => {
        this.scannedCode = data.text;
        console.log(data.text);
      })
    }

    scanCodes() {
      this.barcodeScanner
        .scan()
        .then(barcodeData => {
          alert("Barcode data " + JSON.stringify(barcodeData));
          this.scannedData = barcodeData;
        })
        .catch(err => {
          console.log("Error", err);
        });
    }
   
    encodedText() {
      this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.qrData)
        .then(
          (encodedData) => {
            console.log(encodedData);
            this.createdCode = encodedData.file;
          },
          err => {
            console.log("Error occured : " + err);
          }
        );
    }


  ngOnInit() {
  }

  logOut() {
    Parse.User.logOut().then((resp) => {
      this.isLoggedIn=false;
      console.log('Logged out successfully', resp);
      this.rootPage = 'login';

      this.router.navigate(['login']);
    }, err => {
      console.log('Error logging out', err);

      this.toastCtrl.create({
        message: 'Error logging out',
        duration: 2000
      }).catch();
    })
  }

}
