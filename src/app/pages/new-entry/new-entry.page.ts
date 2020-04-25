import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ControllerService } from 'src/app/services/controller/controller.service';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.page.html',
  styleUrls: ['./new-entry.page.scss'],
})
export class NewEntryPage implements OnInit {

  isReceiverSaved: boolean = false;
  isProcessEnded: boolean = true;
  receiver_id: string;

  selectOptions: any = {
    header: 'Select Gender',
    translucent: true,
    backdropDismiss: false
  };

  constructor(
    private user: UserService,
    private controller: ControllerService,
    private accsPrvds: AccessProviders,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('entry_storage').then((res)=>{
      if (res !== null && typeof res.receiver_id !== 'undefined') {
        this.receiver_id = res.receiver_id;
        this.isReceiverSaved = true;
      }
    });
  }

  submitReceiverDetails(formData) {
    const receiver_id = formData.receiver_id.toString().padStart(2, '0');
    const body = {
      receiver_id: receiver_id,
      address: formData.address,
      user_id: this.user.getUserID()
    }

    this.controller.askConfirmation('Are you sure you want to submit?').then((res) => {
      if (res) {
        this.postDetails(body, 'receiver.php').then((res) => {
          if (res) {
            this.receiver_id = receiver_id;          
            this.storage.set('entry_storage', {receiver_id: receiver_id});
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

  submitBeaconDetails(formData) {
    const beacon_id = formData.beacon_id.toString().padStart(3, '0');
    const body = {
      beacon_id: beacon_id,
      name: formData.name,
      gender: formData.gender,
      age: formData.age,
      receiver_id: this.receiver_id
    }

    this.controller.askConfirmation('Are you sure you want to submit?').then((res) => {
      if (res) {
        this.postDetails(body, 'beacon.php').then((res) => {
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

  closeModal() {
    
  }

}
