import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskService } from '../task-service.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    status: ''
  };
  editMode = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const taskId = this.route.snapshot.params['id'];
    if (taskId) {
      this.editMode = true;
      this.taskService.getTaskById(taskId).subscribe((task) => {
        this.task = task;
      });
    }
  }

  onSubmit(formData: any) {
    if (this.editMode) {
      //edit mode
      this.taskService.updateTask(this.task).subscribe(() => {
        console.log('Task updated');
        this.router.navigate(['/task-ui']); 
      });
    } else {
      //create mode
      const task: Task = {
        id: Math.random(),
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        status: formData.status
      };

      this.taskService.createTask(task).subscribe(() => {
        console.log('Task created');
        this.router.navigate(['/task-ui']); 
      });
    }
  }
}






