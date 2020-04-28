import { Component } from '@angular/core';

import { Platform, ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  backButtonSub: Subscription;
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actSheetCtrl: ActionSheetController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.backButtonSub = this.platform.backButton.subscribe(() => {
      this.onBack();
    });
  }

  ngOnDestroy() {
    this.backButtonSub.unsubscribe();
  }

  onBack() {
    if (this.router.url === '/home') {
      this.modalCtrl.getTop().then(modal => {
        if (modal === undefined) {
          this.actSheetCtrl.getTop().then(actSheet => {
            if (actSheet === undefined) {
              this.alertCtrl.getTop().then(alert => {
                if (alert === undefined) {
                  navigator['app'].exitApp();
                }
                else {
                  this.alertCtrl.dismiss();
                }
              });
            }
            else {
              this.actSheetCtrl.dismiss();
            }
          });
        }
      });
    }
    else if (this.router.url === '/login') {
      navigator['app'].exitApp();
    }
  }
}
