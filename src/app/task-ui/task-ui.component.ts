import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../task-service.service';

@Component({
  selector: 'app-task-ui',
  templateUrl: './task-ui.component.html',
  styleUrls: ['./task-ui.component.css']
})
export class TaskUiComponent implements OnInit {
  tasks: Task[] = [];
  selectedStatus: string = 'All Tasks';
  searchKeyword: string = '';

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  ngOnInit() {
    this.taskService.getTasks();
  }

  get filteredTasks(): Task[] {
    let filteredTasks = [...this.tasks];

    if (this.selectedStatus !== 'All Tasks') {
      filteredTasks = filteredTasks.filter(task => task.status === this.selectedStatus);
    }

    if (this.searchKeyword.trim() !== '') {
      const keyword = this.searchKeyword.toLowerCase().trim();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(keyword) ||
        task.description.toLowerCase().includes(keyword) ||
        task.dueDate.toString().toLowerCase().includes(keyword)
      );
    }

    return filteredTasks;
  }


  deleteTask(task_: Task) {
    if (confirm("Are you sure to delete the task " + task_.title + " ?")) {
      this.taskService.deleteTask(task_.id).subscribe(() => {
        this.tasks = this.tasks.filter(task => !this.taskService.deletedtasks.includes(task.id));
      });
    }
  }
}
