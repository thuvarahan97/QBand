import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ControllerService } from 'src/app/services/controller/controller.service';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from "@ionic/storage";
import { ModalController, Platform, AlertController, ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.page.html',
  styleUrls: ['./new-entry.page.scss'],
})
export class NewEntryPage implements OnInit {

  @ViewChild('beaconForm', {static: false}) beaconForm;
  isReceiverSaved: boolean = false;
  isProcessEnded: boolean = true;
  receiver_id: string;
  beaconsArray: Array<Object> = [];

  selectOptions: any = {
    header: 'Select Gender',
    translucent: true,
    backdropDismiss: false
  };

  backButtonSub: Subscription;

  constructor(
    private user: UserService,
    private controller: ControllerService,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    private modalCtrl: ModalController,
    private platform: Platform,
    private alertCtrl: AlertController,
    private actSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.backButtonSub = this.platform.backButton.subscribe(() => {
      this.onBack();
    });

    this.storage.get('entry_storage').then((res)=>{
      if (res !== null && typeof res.receiver_id !== 'undefined') {
        this.receiver_id = res.receiver_id;
        this.beaconsArray = res.beaconsArray;
        this.isReceiverSaved = true;
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSub.unsubscribe();
  }

  onBack() {
    this.actSheetCtrl.getTop().then(actSheet => {
      if (actSheet === undefined) {
        this.alertCtrl.getTop().then(alert => {
          if (alert !== undefined) {
            if (alert.header === 'Success!') {
              this.storage.remove('entry_storage');
              this.alertCtrl.dismiss();
              this.closeModal();
            }
            else {
              this.alertCtrl.dismiss();
            }
          }
          else {
            this.closeModal();
          }
        });
      }
      else {
        this.actSheetCtrl.dismiss();
      }
    });
  }

  submitReceiverDetails(formData) {
    const receiver_id = formData.receiver_id.toString().padStart(3, '0');
    const body = {
      receiver_id: receiver_id,
      address: formData.address,
      user_id: this.user.getUserID()
    }

    this.controller.askConfirmation('Are you sure you want to submit?').then((res) => {
      if (res) {
        this.postDetails(body, 'add-receiver-info').then((res) => {
          if (res) {
            this.receiver_id = receiver_id;
            this.storage.set('entry_storage', {receiver_id: receiver_id, beaconsArray: this.beaconsArray});
            this.isReceiverSaved = true;
            this.isProcessEnded = false;
          }
          else {
            this.controller.presentToast("Unable to save data!");
          }
        });
      }
    });
  }

  enrollBeaconDetails(formData) {
    const beacon_id = formData.beacon_id.toString().padStart(4, '0');
    const body = {
      becon_id: beacon_id,
      name: formData.name,
      gender: formData.gender,
      age: formData.age,
      receiver_id: this.receiver_id
    }
    this.beaconsArray.push(body);
    this.beaconForm.resetForm();
    this.storage.set('entry_storage', {receiver_id: this.receiver_id, beaconsArray: this.beaconsArray});
  }

  submitBeaconDetails(array) {
    if (array.length > 0) {
      this.controller.askConfirmation('Are you sure you want to submit?').then((res) => {
        if (res) {
          this.postDetails(array, 'add-person-info').then((res) => {
            if (res) {
              this.isProcessEnded = true;
              this.controller.showSuccess('Data has been saved successfully.').then((res) => {
                if (res) {
                  this.storage.remove('entry_storage');
                  this.closeModal();
                }
              });
            }
            else {
              this.controller.presentToast("Unable to save data!");
            }
          });
        }
      });
    }
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

  showDataOptions(index, beacon_id) {
    this.controller.presentActionSheet().then((res) => {
      if (res == 'delete') {
        this.controller.askConfirmation('Are you sure you want to delete this entry?').then((res) => {
          if (res) {
            this.beaconsArray.splice(index, 1);
            this.controller.presentToast('Unenrolled the Beacon ID ' + beacon_id.toString() + '.');
          }
        });
      }
    });
  }

  closeModal() {
    if (!this.isReceiverSaved) {
      this.controller.askConfirmation('Are you sure you want to close?').then((res) => {
        if (res) {
          this.modalCtrl.dismiss();
        }
      });
    }
    else if (this.isProcessEnded) {
      this.modalCtrl.dismiss();
    }
  }

}
