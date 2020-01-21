import { Component } from '@angular/core';
import { UserService } from '../user.service'
import { User } from '../user/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private userService: UserService
  ) {}

  add() {
    const new_user = new User()
    new_user.name = 'Test'
    new_user.id = 1
    this.userService.addUser(new_user)
  }

  get() {
    console.log(this.userService.getUser())
  }
}
