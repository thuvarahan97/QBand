import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  async askConfirmation(message:string, title:string = "Confirm!", okText:string = "YES", cancelText:string = "NO"): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
          header: title,
          subHeader: message,
          buttons: [
            {
              text: okText,
              handler: () => {
                alert.dismiss(true)
                resolve(true);
              }
            }, 
            {
              text: cancelText,
              role: 'cancel',
              handler: () => {
                // alert.dismiss(true);
                resolve(false);
              }
            }
          ]
      });
    await alert.present();
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
