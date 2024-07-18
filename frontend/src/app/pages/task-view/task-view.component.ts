import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { TaskService } from '../../task.service';
@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent implements OnInit {

constructor(private taskService:TaskService){}

ngOnInit(): void {
  throw new Error('Method not implemented.');
}
  
createList() {
    this.taskService.createList('testing').subscribe((response:any)=>{
    console.log(response);
  })
}

}
