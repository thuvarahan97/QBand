import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  todo = {};

  constructor(
    private accsPrvds: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  login() {
    
  }

}
