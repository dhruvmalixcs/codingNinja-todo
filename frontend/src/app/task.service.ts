import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }
  
  createList(title: string){
    return this.webReqService.post('lists',{title});
  }

  updateList(id: string, title: string){
    return this.webReqService.patch(`lists/${id}`, {title});
  }

  deleteList(id: string){
    return this.webReqService.delete(`lists/${id}`);
  }

  getLists(){
    return this.webReqService.get('lists');
  }

  createTask(listId: string, title: string, desc: string, dueDate: string, priority: string) {
    return this.webReqService.post(`lists/${listId}/tasks`, {title, desc, dueDate, priority});
  }
  
  getTasks(listId: string){
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  deleteTask(listId: string, taskId: string){
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  updateTask(listId: string, taskId: string, title: string, desc: string, dueDate: string, priority: string){
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`,{
      title, desc, dueDate, priority
    });
  }

  complete(task: any){
    return this.webReqService.patch(`lists/${task.listId}/tasks/${task._id}`,{
      completed: !task.completed
    })
  }
}