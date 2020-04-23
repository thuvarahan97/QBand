import { Component, OnInit } from '@angular/core';
import { AccessProviders } from "../../providers/access-providers";
import { Storage } from "@ionic/storage";
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.storage.clear();
    this.navCtrl.navigateRoot(['/login']);
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }
}
