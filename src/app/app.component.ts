import { Component, Input } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/user.service'
import { User } from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  users : Array<User>
  navigate : any

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UserService,
    public alertController: AlertController
  ) {
    this.sideMenu();
    this.initializeApp();
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
      },
      {
        title : "Settings",
        url   : "/settings"
      },
    ]
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
      header: 'Create new user',
      inputs: this.create_inputs(this.users),
      buttons: [
        {
          text: 'Select',
          handler: data => {
            console.log(data-1)
            this.userService.add_curr_user(this.users[data-1])
          }
        }
      ]
    });
    alert.present();
  }
}
