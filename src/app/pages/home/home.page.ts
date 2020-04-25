import { Component, OnInit } from '@angular/core';
import { AccessProviders } from "../../providers/access-providers";
import { NavController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { ControllerService } from 'src/app/services/controller/controller.service';
import { NewEntryPage } from '../new-entry/new-entry.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private accsPrvds: AccessProviders,
    private user: UserService,
    private controller: ControllerService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  openNewEntryModal() {
    // this.controller.presentModal(this.newEntryPage);
    this.presentModal(NewEntryPage)
  }

  async presentModal(ModalPage) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      animated: true,
      backdropDismiss: false,
      keyboardClose: true,
      
    });
    return await modal.present();
  }

  logout() {
    this.user.signOut();
    this.navCtrl.navigateRoot(['/login']);
  }

}
