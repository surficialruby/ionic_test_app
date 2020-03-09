import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { TaskService } from '../task.service';

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
    public taskservice: TaskService
  ) { }

  ngOnInit() {
    const id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'))
    let display: any = this.taskservice.get_element(id)

    this.title = display.title
    this.description = display.description
  }

}
