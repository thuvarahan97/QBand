import { Component, OnInit } from '@angular/core';
import { AccessProviders } from "../../providers/access-providers";
import { Storage } from "@ionic/storage";
import { ToastController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';

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
    private user: UserService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.user.signOut();
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
