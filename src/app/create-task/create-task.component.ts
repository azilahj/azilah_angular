import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskService } from '../task-service.service';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  errorMessages: string[] = [];
  editMode = false;
  updateTaskid: number = 0;

  specificTask: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(1 / 1 / 2001),
    status: '',
  };

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const url = window.location.href;

    if (url.includes('edit-task')) {
      this.editMode = true;
      const match = url.match(/\/edit-task\/(\d+)/);

      if (match) {
        const taskId = +match[1];

        this.taskService.getTasks().subscribe((tasks: Task[]) => {
          for (const task of tasks) {
            if (task['id'].toString().replace(/\s/g, "") === taskId.toString().replace(/\s/g, "")) {
              this.specificTask = task;
              console.log("Task found: ",task);
              break;
            }}
        });
      } else {
        this.router.navigate(['/task-ui']);
      }
    }
  }

  onSubmit(formData: any) {

    if ((formData.title === '') || (formData.dueDate.empty) || (formData.status === '')) {
      this.errorMessages.push('Fields cannot be empty.');
    } else {
      if (this.editMode) {

        const updatedtask: Task = {
          id: formData.id,
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate,
          status: formData.status
        };

        this.taskService.updateTask(updatedtask).subscribe(() => {
          console.log('Task updated');
          this.taskService.getTasks();
          this.router.navigate(['/task-ui']);
        });

      } else {

        const task: Task = {
          id: 0,
          title: formData.title,
          description: formData.description,
          dueDate: formData.dueDate,
          status: formData.status
        };

        this.taskService.createTask(task).subscribe(() => {
          this.taskService.getTasks();
          this.router.navigate(['/task-ui']);
        });
      }
    }
  }
}






