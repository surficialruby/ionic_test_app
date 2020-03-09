import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'
import { User } from '../user/user';
import { Task } from '../task/task';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { TaskService } from '../task.service';
import { ViewChild } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  new_id : number
  new_task_id : number
  tasks : Array<Task> = []
  id : number
  user : User

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup

  constructor(
    private userService: UserService,
    private storage: Storage,
    public alertController: AlertController,
    private taskService: TaskService
  ) {

  }

  ngOnInit() {
    if(!this.userService.get_curr_user()){
      this.presentPrompt()
    } else {
      this.get_tasks()
    }
  }

  doReorder(ev: any) {
    this.tasks = ev.detail.complete(this.tasks)
    this.taskService.update_tasks(this.tasks)
    console.log(this.tasks)
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled
  }

  private async get_user() {
    await this.userService.get_curr_user().then(val => {
      this.user = val
    })
    console.log(this.user)
    return this.user
  }

  private async get_user_id() {
    await this.userService.get_curr_user_id().then(val => {
      this.id = val
      console.log(this.id)
    })
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
    console.log(this.userService.get_users())
  }

  private get_last_id() {
    this.new_id = this.userService.get_last_id() + 1
  }

  private get_last_task_id() {
    this.new_task_id = this.taskService.get_last_id() + 1
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

  get_tasks() {
    console.log(this.taskService.get_tasks())
    this.taskService.get_tasks().then(val => {
      this.tasks = val
    })
  }

  async add_task(title,desciption) {
    this.get_last_task_id()
    await this.get_user_id()
    let new_task = new Task()
    new_task.title = title
    new_task.id = this.new_task_id
    new_task.description = desciption
    new_task.state = 0
    new_task.user_id = this.id
    this.taskService.add_task(new_task)
  }

  async add_task_prompt() {
    const alert = await this.alertController.create({
      header: 'Add new task',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'desciption',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Select',
          handler: data => {
            console.log(data)
            this.add_task(data.title,data.desciption)
          }
        }
      ]
    });
    alert.present();
  }
}
