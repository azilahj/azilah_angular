import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskUiComponent } from './task-ui/task-ui.component';
import { CreateTaskComponent } from './create-task/create-task.component';

const routes: Routes = [
  { path: 'task-ui', component: TaskUiComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'edit-task/:id', component: CreateTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
