import { Injectable } from '@angular/core';

import { User } from 'src/app/user/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user : Array<User> = []

  constructor() { }

  public getUser(): Array<User> {
    return this.user
  }

  public addUser(user: User) {
    this.user.push(user)
  }
  
}
