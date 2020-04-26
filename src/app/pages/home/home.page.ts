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
    this.accsPrvds.getData('get-persons-status/' + user_id).subscribe((res:any)=>{
      if (res.success == true) {
        this.receiversArray = res.result;
      }
      else {
        this.receiversArray = [];
      }
    },
    (err)=>{
      this.controller.presentToast('Failed to retrieve records!');
    });
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

  showDataOptions(receiver_id) {
    this.controller.presentActionSheet().then((res) => {
      if (res == 'delete') {
        this.controller.askConfirmation('Are you sure you want to delete this record?').then((res) => {
          if (res) {
            const body = {
              receiver_id: receiver_id
            }
            this.postDetails(body, 'delete_record.php').then((res) => {
              if (res) {
                this.controller.presentToast('Record with Receiver ID ' + receiver_id.toString() + ' has been deleted.');
              }
              else {
                this.controller.presentToast("Unable to delete record!");
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
    this.viewAllData(this.user_id).then(() => {
      event.target.complete();
    });
  }

  logout() {
    this.user.signOut();
    this.navCtrl.navigateRoot(['/login']);
  }

}
