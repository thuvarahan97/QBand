import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from "@ionic/storage";
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private accsPrvds: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }

  login(formData) {
    return new Promise(resolve=> {
      let body = {
        username: formData.username,
        password: Md5.hashStr(formData.password)
      }

      this.accsPrvds.postData(body, 'login.php').subscribe((res:any)=>{
        if(res.success == true){
          this.storage.set('session_storage', res.result);
          this.presentToast('Successfully logged in!')
          this.navCtrl.navigateRoot(['/home']);
        }
        else {
          this.presentToast('Incorrect username or password!')
        }
      },
      (err)=>{
        this.presentToast('Login Timeout!');
      });
    });
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
