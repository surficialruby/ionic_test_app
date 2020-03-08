import { Injectable } from '@angular/core';

import { User } from 'src/app/user/user'
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users : Array<User> = []
  private user : User

  constructor(private storage:Storage) { }

  public get_curr_user() {
    this.storage.get('cur_user').then(val => {
      let user = JSON.parse(val)
      this.user = user
    })
    return this.user
  }

  /**
  * Get user list from storage
  */
  public get_users(): Array<User> {
    this.storage.get('users').then(val => {
      let users = JSON.parse(val)
        this.users = users
    })
    return this.users
  }

  /**
  * Add user to users array and storage
  */
  public add_user(user: User) {
    this.users.push(user)
    this.storage.set('users',JSON.stringify(this.users))
  }

  public add_curr_user(new_user) {
    this.user = new_user
    this.storage.set('cur_user',JSON.stringify(this.users))
  }

  /**
   * get array length
   */
  public get_last_id() : number {
    return this.users.length
  }
  
}
