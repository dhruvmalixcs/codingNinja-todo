import { Routes } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';

export const routes: Routes = [
    {path: '', redirectTo: 'lists', pathMatch: 'full'},
    {path: 'lists', component: TaskViewComponent},
    {path: 'lists/:listId', component: TaskViewComponent}
];