import { Component } from '@angular/core';

import { Platform, NavController, ModalController, AlertController, ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

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
    private statusBar: StatusBar,
    private navCtrl: NavController,
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
    // const openMenu = await this.menuCtrl.getOpen();
    // if (openMenu) {
    //   await openMenu.close();
    // } else {
      // await this.navCtrl.pop();
    // }
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
