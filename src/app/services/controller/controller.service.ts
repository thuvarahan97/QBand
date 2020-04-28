import { Injectable } from '@angular/core';
import { ToastController, AlertController, ModalController, ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private actSheetCtrl: ActionSheetController
  ) { }

  async askConfirmation(message:string, title:string = "Confirm!", okText:string = "YES", cancelText:string = "NO"): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
          header: title,
          subHeader: message,
          backdropDismiss: false,
          animated: true,
          keyboardClose: true,
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

  async showSuccess(message:string, title:string = "Success!", okText:string = "OK"): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
          header: title,
          subHeader: message,
          backdropDismiss: false,
          animated: true,
          keyboardClose: true,
          buttons: [
            {
              text: okText,
              handler: () => {
                alert.dismiss(true)
                resolve(true);
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
      position: 'bottom',
      cssClass: 'custom-toast'
    });
    toast.present();
  }

  async presentActionSheet() {
    return new Promise(async (resolve) => {
      const actionSheet = await this.actSheetCtrl.create({
        animated: true,
        backdropDismiss: true,
        keyboardClose: true,
        translucent: true,
        buttons: [
          {
            text: 'Delete',
            role: 'destructive',
            icon: 'trash',
            handler: () => {
              resolve('delete')
            }
          }
        ]
      });
      await actionSheet.present();
    });
  }

  // async presentModal(ModalPage) {
  //   const modal = await this.modalCtrl.create({
  //     component: ModalPage,
  //     animated: true,
  //     backdropDismiss: false,
  //     keyboardClose: true,
      
  //   });
  //   return await modal.present();
  // }

}
