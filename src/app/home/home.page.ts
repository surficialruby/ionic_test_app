import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service'
import { User } from '../user/user';
import { Task } from '../task/task';
import { AlertController, IonReorderGroup } from '@ionic/angular';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  new_task_id : number
  tasks : Array<Task> = []
  id : number
  user : User

  @ViewChild(IonReorderGroup, {static: true}) reorderGroup: IonReorderGroup

  constructor(
    private userService: UserService,
    public alertController: AlertController,
    private taskService: TaskService
  ) {
    
  }

  ngOnInit() {
    if(this.get_user()){
      setInterval(() => {
        this.check_user()
      }, 100)
    }
    if(this.taskService.get_tasks()){
      this.get_tasks()
    }
  }

  doReorder(ev: any) {
    this.tasks = ev.detail.complete(this.tasks)
    this.taskService.update_tasks(this.tasks)
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

  private async check_user() {
    await this.userService.get_curr_user().then(val => {
      if(this.user.id != val.id) {
        this.get_user()
        this.get_tasks()
      }
    })
    if(this.taskService.check_task_update()) {
      this.get_tasks()
    }
  }

  private async get_user_id() {
    await this.userService.get_curr_user_id().then(val => {
      this.id = val
    })
  }

  get() {
    console.log(this.userService.get_users())
  }

  private get_last_task_id() {
    this.new_task_id = this.taskService.get_last_id() + 1
  }

  get_tasks() {
    this.taskService.get_tasks().then(val => {
      this.tasks = []
      for(let i=0, len = val.length;i<len;i++) {
        if(val[i].user_id == this.user.id){
          this.tasks.push(val[i])
        }
      }
    })
    
  }

  async add_task(title,desciption) {
    this.get_last_task_id()
    await this.get_user_id()
    let new_task = new Task()
    new_task.title = title
    new_task.id = this.new_task_id
    new_task.description = desciption
    new_task.state = 0 //default in progress state
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
            this.add_task(data.title,data.desciption)
          }
        }
      ]
    });
    alert.present();
  }
  
}
