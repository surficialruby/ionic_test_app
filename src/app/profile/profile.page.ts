import { Component, OnInit } from '@angular/core';
import { User } from '../user/user'
import { UserService } from '../user.service'
import { AlertController } from '@ionic/angular'
import { Location } from '@angular/common'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name: string
  id: number

  constructor(
    private location: Location,
    private userService: UserService,
    public alertController: AlertController
  ) {
    this.get_user()
  }

  ngOnInit() {
  }

  get_user(){
    this.userService.get_curr_user().then(val => {
      if(val){
        this.name = val.name
        this.id = val.id
      }
    })
  }

  del_user() {
    this.userService.del_user(this.id)
    this.location.back()
  }

  async edit_user_prompt() {
    const alert = await this.alertController.create({
      header: 'Edit user',
      inputs: [
        {
          name: 'name',
          placeholder: 'New name'
        }
      ],
      buttons: [
        {
          text: 'Select',
          handler: data => {
            let user: User = new User
            user.name = this.name
            user.id = this.id
            if(data.name != '') user.name = data.name
            this.userService.edit_user(user)
          }
        }
      ]
    });
    alert.present();
  }

}
