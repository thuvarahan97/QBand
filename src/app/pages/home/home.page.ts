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

  receiversArray: Array<Object>;
  user_id: string;
  isLoading: boolean = false;
  isFailed;

  constructor(
    private navCtrl: NavController,
    private accsPrvds: AccessProviders,
    private user: UserService,
    private controller: ControllerService,
    private modalCtrl: ModalController
  ) {  
    this.user_id = this.user.getUserID();
  }

  ngOnInit() {
    this.viewAllData(this.user_id);
  }

  async viewAllData(user_id) {
    this.isLoading = true;
    this.accsPrvds.getData('get-persons-status/' + user_id).subscribe((res:any)=>{
      if (res.success == true) {
        this.receiversArray = res.result;
        this.isLoading = false;
        this.isFailed = true;
      }
      else {
        this.receiversArray = [];
        this.isLoading = false;
        this.isFailed = true;
      }
    },
    (err)=>{
      this.controller.presentToast('Unable to retrieve records! Try again.');
      this.isLoading = false;
      this.isFailed = true;
    });
  }

  openNewEntryModal() {
    // this.controller.presentModal(this.newEntryPage);
    this.presentModal(NewEntryPage);
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

  showReceiverOptions(receiver_id) {
    this.controller.presentActionSheet().then((res) => {
      if (res == 'delete') {
        this.controller.askConfirmation('Are you sure you want to delete the record of Receiver ID ' + receiver_id.toString() + '?').then((res) => {
          if (res) {
            const body = {
              receiver_id: receiver_id
            }
            this.postDetails(body, 'remove-receiver').then((res) => {
              if (res) {
                this.controller.presentToast('Record with Receiver ID ' + receiver_id.toString() + ' has been deleted.');
                this.viewAllData(this.user_id);
              }
              else {
                this.controller.presentToast("Unable to delete receiver record!");
              }
            });
          }
        });
      }
    });
  }

  showBeaconOptions(beacon_id) {
    this.controller.presentActionSheet().then((res) => {
      if (res == 'delete') {
        this.controller.askConfirmation('Are you sure you want to delete the record of Beacon ID ' + beacon_id.toString() + '?').then((res) => {
          if (res) {
            const body = {
              becon_id: beacon_id
            }
            this.postDetails(body, 'remove-person').then((res) => {
              if (res) {
                this.controller.presentToast('Record with Beacon ID ' + beacon_id.toString() + ' has been deleted.');
                this.viewAllData(this.user_id);
              }
              else {
                this.controller.presentToast("Unable to delete beacon record!");
              }
            });
          }
        });
      }
    });
  }

  postDetails(body, url): Promise<boolean> {
    return new Promise(resolve=> {
      this.accsPrvds.postData(body, url).subscribe((res:any)=>{
        if(res.success == true){
          resolve(true);
        }
        else {
          resolve(false);
        }
      },
      (err)=>{
        resolve(false);
      });
    });
  }

  doRefresh(event) {
    this.viewAllData(this.user_id);
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  tryAgain() {
    this.viewAllData(this.user_id);
  }

  logout() {
    this.user.signOut();
    this.navCtrl.navigateRoot(['/login']);
  }

}
