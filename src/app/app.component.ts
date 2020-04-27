import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
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
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private router: Router
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
    if (this.router.url === '/home' || this.router.url === '/login') {
      navigator['app'].exitApp();
    }
  }
}
