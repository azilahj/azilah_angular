import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task-service.service';

@Component({
  selector: 'app-task-ui',
  templateUrl: './task-ui.component.html',
  styleUrls: ['./task-ui.component.css']
})
export class TaskUiComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }
}
