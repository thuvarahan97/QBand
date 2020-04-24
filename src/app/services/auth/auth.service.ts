import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from '../user/user.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthService implements CanActivate {

	constructor(
		private navCtrl: NavController, 
		private user: UserService
  ) { }

	async canActivate(route) {
		if (await this.user.isLoggedIn()) {
			return true;
		}
		else {
			this.navCtrl.navigateRoot(['/login']);
			return false;
		}
	}
}
