import { Injectable } from '@angular/core';

import { Task } from 'src/app/task/task'
import { UserService } from 'src/app/user.service'
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasks : Array<Task> = []
  
  private task_states : Array<String> = [
    'In progress',
    'to be done'
  ]
  constructor(private storage : Storage) { }

  /**
  * Get task list from storage
  */
  public async get_tasks() {
    await this.storage.get('tasks').then(val => {
      let tasks = JSON.parse(val)
      if(tasks != null) {
        this.tasks = tasks
      }
    })
    return this.tasks
  }

  /**
  * Add task to tasks array and storage
  */
  public add_task(task : Task) {
    this.tasks.push(task)
    this.storage.set('tasks',JSON.stringify(this.tasks))
  }

  public update_tasks(tasks) {
    this.tasks = tasks
    this.storage.set('tasks',JSON.stringify(this.tasks))
  }

  public edit_task() {

  }

  /**
   * get array length
   */
  public get_last_id() : number {
    return this.tasks.length
  }

}
