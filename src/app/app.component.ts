import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    public navCtrl: NavController,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('session_storage').then((res)=>{
      if (res==null){
        this.navCtrl.navigateRoot('/login');
      }
      else{
        this.navCtrl.navigateRoot('/home');
      }
    });
  }

  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.router.url === '/home' || this.router.url === '/login') {
        navigator['app'].exitApp();
      }  else {
       this.navCtrl.back();
      }
    });
  }
}
