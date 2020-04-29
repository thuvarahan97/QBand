import { Component, OnInit, ViewChild } from '@angular/core';
import { AccessProviders } from 'src/app/providers/access-providers';
import { NavController } from '@ionic/angular';
import { Md5 } from 'ts-md5/dist/md5';
import { ControllerService } from 'src/app/services/controller/controller.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('form', {static: false}) signupForm;
  isPasswordsMatched: boolean = false;
  passwordStatus;
  // usernameStatus;

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
        const body = {
          // fullname: formData.fullname,
          // phone_number: formData.phone_number,
          username: formData.username,
          password: Md5.hashStr(formData.password)
        }

        this.accsPrvds.postData(body, 'signup').subscribe((res:any)=>{
          if(res.success == true){
            this.controller.presentToast('Successfully registered!')
            this.navCtrl.navigateRoot(['/login']);
          }
          else {
            this.controller.presentToast('Username does not exist!')
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

  // onKeyUsername(event) {
  //   this.usernameStatus = this.signupForm.controls.username.status;
  // }

  onKeyPassword(event) {
    var value = event.target.value;
    var cpassword = this.signupForm.value.confirm_password;
    this.passwordStatus = this.signupForm.controls.password.status;

    if (value === cpassword) {
      if (value.length > 0 && cpassword.length > 0) {
        this.isPasswordsMatched = true;
      }
      else {
        this.isPasswordsMatched = false;
      }
    }
    else {
      this.isPasswordsMatched = false;
    }
  }

  onKeyConfirmPassword(event) {
    var value = event.target.value;
    var password = this.signupForm.value.password;

    if (value === password) {
      if (value.length > 0 && password.length > 0) {
        this.isPasswordsMatched = true;
      }
      else {
        this.isPasswordsMatched = false;
      }
    }
    else {
      this.isPasswordsMatched = false;
    }
  }

  goToLogin() {
		this.navCtrl.back();
	}

}
