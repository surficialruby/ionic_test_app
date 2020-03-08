import { Component } from '@angular/core';
import { UserService } from '../user.service'
import { User } from '../user/user';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  new_id : number

  constructor(
    private userService: UserService,
    private storage: Storage,
    public alertController: AlertController
  ) {
    if(!this.get_user()){
      this.presentPrompt()
    }
  }

  private get_user() {
    return this.userService.get_curr_user()
  }

  /**
   * Add new user
   */
  add(name:string) {
    this.get_last_id()
    console.log(this.new_id)
    const new_user = new User()
    new_user.name = name
    new_user.id = this.new_id
    this.userService.add_user(new_user)
    this.userService.add_curr_user(new_user)
  }

  get() {
    console.log(this.userService.get_curr_user())
  }

  private get_last_id() {
    this.new_id = this.userService.get_last_id() + 1
  }
  
  async presentPrompt() {
    const alert = await this.alertController.create({
      header: 'Create new user',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        }
      ],
      buttons: [
        {
          text: 'Create',
          handler: data => {
            if(data.username.length > 1) {
              this.add(data.username)
            } else {
              return false
            }
          }
        }
      ]
    });
    alert.present();
  }
}
