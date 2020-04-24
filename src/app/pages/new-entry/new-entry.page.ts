import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ControllerService } from 'src/app/services/controller/controller.service';
import { AccessProviders } from 'src/app/providers/access-providers';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.page.html',
  styleUrls: ['./new-entry.page.scss'],
})
export class NewEntryPage implements OnInit {

  receiverSaved: boolean = false;
  processEnded: boolean = true;
  receiver_id: string;

  constructor(
    private user: UserService,
    private controller: ControllerService,
    private accsPrvds: AccessProviders
  ) { }

  ngOnInit() {
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
            this.receiverSaved = true;
            this.processEnded = false;
          }
          else {
            this.controller.presentToast("Unable to save data!");
          }
        });
      }
    });
  }

  submitBeaconDetails(formData) {
    const beacon_id = formData.beacon_id.toString().padStart(2, '0');
    const body = {
      beacon_id: beacon_id,
      name: formData.address,
      gender: formData.gender,
      age: formData.age,
      receiver_id: this.receiver_id
    }

    this.controller.askConfirmation('Are you sure you want to submit?').then((res) => {
      if (res) {
        this.postDetails(body, 'beacon.php').then((res) => {
          if (res) {
            this.processEnded = true;
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

}
