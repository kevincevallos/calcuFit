import { Component, OnInit } from '@angular/core';
import Parse from 'parse';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router,
    public toastCtrl: ToastController) { }

  ngOnInit() {
  }



}
