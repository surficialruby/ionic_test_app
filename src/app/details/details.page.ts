import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { TaskService } from '../task.service';
import { Location } from '@angular/common';
import { Task } from '../task/task';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  title: string
  description: string

  constructor(
    public activatedRoute: ActivatedRoute,
    public taskservice: TaskService,
    private location: Location,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.load_task()
  }

  private load_task() {
    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'))
    let display: any = this.taskservice.get_element(id)

    this.title = display.title
    this.description = display.description
  }

  del_task() {
    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'))
    this.taskservice.del_task(id)
    this.location.back()
  }

  async edit_task_prompt() {
    const alert = await this.alertController.create({
      header: 'Edit task',
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
            let task = this.taskservice.get_element(parseInt(this.activatedRoute.snapshot.paramMap.get('id')))
            if(data.desciption != '') task.description = data.desciption
            if(data.title != '') task.title = data.title
            this.taskservice.edit_task(task)
            this.load_task()
          }
        }
      ]
    });
    alert.present();
  }

}
