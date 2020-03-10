import { Injectable } from '@angular/core';

import { User } from 'src/app/user/user'
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private users : Array<User> = []
  private user : User
  private user_id : number

  constructor(private storage:Storage) {

  }

  public async get_curr_user() {
    await this.storage.get('cur_user').then(val => {
      let user = JSON.parse(val)
      this.user = user
    })
    return this.user
  }

  public async get_curr_user_id() {
    await this.storage.get('cur_user').then(val => {
      let user = JSON.parse(val)
      this.user_id = user.id
    })
    return this.user_id
  }

  /**
  * Get user list from storage
  */
  public async get_users() {
    await this.storage.get('users').then(val => {
      let users = JSON.parse(val)
      if(users.length != 0) {
        this.users = users
      }
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
    this.storage.set('cur_user',JSON.stringify(this.user))
  }

  /**
   * get array length
   */
  public get_last_id() : number {
    return this.users.length
  }

  public async edit_user(user) {
    this.add_curr_user(user)
    await this.get_users()
    for(let i = 0, len = this.users.length;i<len;i++) {
      if(this.users[i].id == user.id){
        this.users[i] = user
        this.storage.set('users',JSON.stringify(this.users))
      }
    }
  }

  public del_user(id) {

  }
  
}
