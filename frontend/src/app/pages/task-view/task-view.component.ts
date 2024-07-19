import { Component, HostListener } from '@angular/core';
import { TaskService } from '../../task.service';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ExportService } from '../../services/export.service';

interface PriorityOrder {
  low: number;
  medium: number;
  high: number;
}

@Component({
  selector: 'app-taskview',
  standalone: true,
  imports: [NgClass, FormsModule, CommonModule, RouterModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss'
})
export class TaskViewComponent {
  createListModalOpen: boolean = false;
  createTaskModalOpen: boolean = false;
  updateListModalOpen: boolean = false;
  updateTaskModalOpen: boolean = false;

  listId: string = '';
  currentTask: any = {};

  lists: any[] = [];
  tasks: any[] = [];
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router,private exportService: ExportService) {}

  ngOnInit(){
    // this.loadTasks();
    // this.loadLists();
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
        if (this.listId) {
          this.taskService.getTasks(this.listId).subscribe(
            (tasks: any) => {
              this.tasks = tasks;
            },
            (error) => {
              console.error('Failed to fetch tasks:', error);
            }
          );
        } else {
          console.error('listId is undefined');
        }
      }
    );

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })
  }

  // loadTasks(): void {
  //   this.taskService.getTasks('some-list-id').subscribe(tasks => {
  //     this.tasks = tasks;
  //   });
  // }

  // loadLists(): void {
  //   this.taskService.getLists().subscribe(lists => {
  //     this.lists = lists;
  //   });
  // }

  exportTasksToExcel(): void {
    this.exportService.exportToExcel(this.tasks, 'Tasks');
  }

  exportListsToExcel(): void {
    this.exportService.exportToExcel(this.lists, 'Lists');
  }

  toggleCreateListModal(event: Event) {
    event.stopPropagation();
    console.log("toggle create list modal");
    this.createListModalOpen = !this.createListModalOpen;
  }

  toggleUpdateListModal(event: Event) {
    event.stopPropagation();
    console.log("toggle update list modal");
    this.updateListModalOpen = !this.updateListModalOpen;
  }

  toggleCreateTaskModal(event: Event) {
    event.stopPropagation();
    console.log("toggle create task modal");
    this.createTaskModalOpen = !this.createTaskModalOpen;
  }

  toggleUpdateTaskModal(event: Event, task: any) {
    event.stopPropagation();
    console.log("toggle create task modal");
    this.currentTask = task;
    this.updateTaskModalOpen = !this.updateTaskModalOpen;
  }

  createList(title: string){
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      this.lists.push(response);
      this.createListModalOpen = false;
      this.router.navigate(['/lists',response._id]);
    })
  }

  deleteListClick(){
    if(this.listId){
      this.taskService.deleteList(this.listId).subscribe((response: any) => {
        this.router.navigate(['/lists']);
        console.log(response);
      });
    }
  }

  updateList(title: string){
    if(this.listId){
      this.taskService.updateList(this.listId, title).subscribe(() => {
        const listToUpdate = this.lists.find(list => list._id === this.listId);
        if(listToUpdate){
          listToUpdate.title = title;
        }

        this.updateListModalOpen = false;
        this.router.navigate(['/lists', this.listId]);
      });
    } else console.error('No list selected');
  }

  createTask(title: string, desc: string, dueDate: string, priority: string){
    if(this.listId){
      this.taskService.createTask(this.listId, title, desc, dueDate, priority).subscribe((response: any) => {
        console.log(response);
        this.tasks.push(response);
        this.createTaskModalOpen = false;
      });
    }else console.error('No list selected');
  }

  deleteTaskClick(id: string){
    if(this.listId){
      this.taskService.deleteTask(this.listId,id).subscribe((response: any) => {
        this.tasks = this.tasks.filter(value => value._id !== id)
        console.log(response);
      });
    }
  }

  updateTask(title: string, desc: string, dueDate: string, priority: string){
    if (this.listId && this.currentTask._id) {
      this.taskService.updateTask(this.listId, this.currentTask._id, title, desc, dueDate, priority).subscribe(() => {
        const taskToUpdate = this.tasks.find(task => task._id === this.currentTask._id);
        if (taskToUpdate) {
          taskToUpdate.title = title;
          taskToUpdate.desc = desc;
          taskToUpdate.dueDate = dueDate;
          taskToUpdate.priority = priority;
        }
        this.updateTaskModalOpen = false;
      });
    } else {
      console.error('No task selected');
    }
  }

  onTaskClick(task: any){
    this.taskService.complete(task).subscribe(() => {
      console.log("task completion toggled");
      task.completed = !task.completed;
    })
  }

  sortTasksBy(option: string) {
    if (option === 'priority') {
      const priorityOrder: PriorityOrder = { 'low': 3, 'medium': 2, 'high': 1 };
  
      this.tasks.sort((a, b) => {
        return priorityOrder[a.priority as keyof PriorityOrder] - priorityOrder[b.priority as keyof PriorityOrder];
      });
    } else if (option === 'duedate') {
      this.tasks.sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();
        return dateA - dateB;
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.createListModalOpen && !(event.target as HTMLElement).closest('.create-list-modal-box')) {
      this.createListModalOpen = false;
    }
    if (this.createTaskModalOpen && !(event.target as HTMLElement).closest('.create-task-modal-box')) {
      this.createTaskModalOpen = false;
    }
    if (this.updateListModalOpen && !(event.target as HTMLElement).closest('.update-list-modal-box')) {
      this.updateListModalOpen = false;
    }
    if (this.updateTaskModalOpen && !(event.target as HTMLElement).closest('.update-task-modal-box')) {
      this.updateTaskModalOpen = false;
    }
  }
}