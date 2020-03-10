import { Component, Input } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/user.service'
import { User } from './user/user';
import { HomePage } from './home/home.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  users : Array<User>
  navigate : any
  new_id : number
  user: User
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    public alertController: AlertController
  ) {
    this.sideMenu();
    this.initializeApp();
    if(!this.get_user()){
      this.presentPrompt()
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  /*
  * Create Navigation array
  */
  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home"
      },
      {
        title : "Profile",
        url   : "/profile"
      }
    ]
  }

  private async get_user() {
    await this.userService.get_curr_user().then(val => {
      this.user = val
    })
    return this.user
  }

  private create_inputs(users_arr) {
    const theNewInputs = [];
    for (let i = 0; i < users_arr.length; i++) {
      theNewInputs.push(
        {
          name: users_arr[i].name,
          type: 'radio',
          label: users_arr[i].name,
          value: users_arr[i].id,
          checked: false
        }
      );
    }
    return theNewInputs;
  }

  async presentPrompt() {
    await this.userService.get_users().then(val => {
      this.users = val
    })
    const alert = await this.alertController.create({
      header: 'Select user',
      inputs: this.create_inputs(this.users),
      buttons: [
        {
          text: 'Select',
          handler: data => {
            this.userService.add_curr_user(this.users[data-1])
          }
        }
      ]
    });
    alert.present();
  }

  private get_last_id() {
    this.new_id = this.userService.get_last_id() + 1
  }

  add(name:string) {
    this.get_last_id()
    const new_user = new User()
    new_user.name = name
    new_user.id = this.new_id
    this.userService.add_user(new_user)
    this.userService.add_curr_user(new_user)
  }

  async add_user_prompt() {
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
