import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from "@ionic/storage";
import { Md5 } from 'ts-md5/dist/md5';
import { UserService } from 'src/app/services/user/user.service';
import { ControllerService } from 'src/app/services/controller/controller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('form', {static: false}) loginForm;
  
  constructor(
    private accsPrvds: AccessProviders,
    private storage: Storage,
    private navCtrl: NavController,
    private user: UserService,
    private controller: ControllerService
  ) { }

  ngOnInit() {
  }

  login(formData) {
    return new Promise(resolve=> {
      const body = {
        username: formData.username,
        password: Md5.hashStr(formData.password)
      }

      this.accsPrvds.postData(body, 'login').subscribe((res:any)=>{
        if(res.success == true){
          this.user.setUser({
            user_id: res.result.user_id,
            fullname: res.result.fullname,
            username: res.result.username
          });
          this.storage.set('session_storage', res.result);
          this.controller.presentToast('Successfully logged in!')
          this.navCtrl.navigateRoot(['/home']);
        }
        else {
          this.controller.presentToast('Incorrect username or password!')
        }
      },
      (err)=>{
        this.controller.presentToast('Login Timeout!');
      });
    });
  }

	goToSignup() {
		this.loginForm.reset();
		this.navCtrl.navigateForward(['/register']);
	}

}
