import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { NavController } from '@ionic/angular';

interface User {
	user_id: string,
  fullname: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

	private user: User;

  constructor(
    private storage: Storage
  ) { }

  setUser(user: User) {
		this.user = user;
	}

	getUserID(): string {
		return this.user.user_id;
  }
	
	getUsername(): string {
		return this.user.username;
	}
	
	getFullname(): string {
		return this.user.fullname;
	}

  async isLoggedIn() {
    if (this.user) return true;
    
    const userSession = await this.storage.get('session_storage').then((res)=>{
      if (res==null){
        return {success: false};
      }
      else{
        return {success: true, result: res};
      }
    });

		if (userSession.success) {
			this.setUser({
				user_id: userSession.result.user_id,
        fullname: userSession.result.fullname,
        username: userSession.result.username
			});
			return true;
		}
		return false;
	}

	signOut(): Promise<void> {
    return this.storage.clear();
  }
  
}
