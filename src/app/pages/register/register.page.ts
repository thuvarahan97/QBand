import { Component, OnInit } from '@angular/core';
import { AccessProviders } from 'src/app/providers/access-providers';
import { NavController, ToastController } from '@ionic/angular';
import { Md5 } from 'ts-md5/dist/md5';
import { ControllerService } from 'src/app/services/controller/controller.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private accsPrvds: AccessProviders,
    private navCtrl: NavController,
    private controller: ControllerService
  ) { }

  ngOnInit() {
  }

  register(formData) {
    if (formData.password === formData.confirm_password) {
      return new Promise(resolve=> {
        let body = {
          fullname: formData.fullname,
          username: formData.username,
          password: Md5.hashStr(formData.password)
        }

        this.accsPrvds.postData(body, 'signup.php').subscribe((res:any)=>{
          if(res.success == true){
            this.controller.presentToast('Successfully registered!')
            this.navCtrl.navigateRoot(['/login']);
          }
          else {
            this.controller.presentToast('Username already exists!')
          }
        },
        (err)=>{
          this.controller.presentToast('Signup Timeout!');
        });
      });
    }
    else {
      this.controller.presentToast('Passwords do not match!')
    }
  }

}
