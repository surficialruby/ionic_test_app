import { Injectable } from '@angular/core';

import { Task } from 'src/app/task/task'
import { UserService } from 'src/app/user.service'
import { Storage } from '@ionic/storage';
import { isEmptyExpression } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasks : Array<Task> = []
  private task_updated: Boolean = false
  
  private task_states : Array<String> = [
    'In progress',
    'to be done',
    'done'
  ]

  constructor(private storage : Storage) {

   }

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
    this.task_updated = true
  }

  public update_tasks(tasks = this.tasks) {
    this.tasks = tasks
    this.storage.set('tasks',JSON.stringify(this.tasks))
  }

  public edit_task(task: Task) {
    for(let i = 0, len = this.tasks.length;i<len;i++) {
      if(this.tasks[i].id == task.id){
        this.tasks[i] = task
        this.update_tasks()
      }
    }
    this.task_updated = true
  }
  
  public del_task(id) {
    for(let i = 0, len = this.tasks.length;i<len;i++) {
      if(this.tasks[i].id == id){
        this.tasks.splice(i,1)
        this.update_tasks()
      }
    }
    this.task_updated = true
  }

  public async del_user_tasks(id) {
    await this.get_tasks()
    for(let i = 0, len = this.tasks.length;i<len;i++) {
      if(this.tasks[i].user_id == id){
        this.tasks.splice(i,1)
        this.update_tasks()
      }
    }
    this.task_updated = true
  }

  /**
   * get array length
   */
  public get_last_id() : number {
    return this.tasks.length
  }

  public get_element(id: number) {
    for(const task of this.tasks) {
      if(task.id == id) {
        return task
      }
    }
  }

  public check_task_update() {
    if(this.task_updated){
      this.task_updated = false
      return true
    }
  }

}
