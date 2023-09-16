import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private nextId = 1;

  tasks: Task[] = [];
  deletedtasks: number[] = [];

  getNextId(): number {
    return this.nextId++;
  }

  constructor(private http: HttpClient) { }

  getTasks(): Task[] {
    this.tasks = this.tasks.filter(task => !this.deletedtasks.includes(task.id));
    return this.tasks;
  }

  createTask(taskData: Task): Observable<Task> {

    this.tasks.push(taskData);

    return this.http.post(this.apiUrl, taskData).pipe(
      map((response: any) => {
        console.log('Task created:', taskData);
        return taskData;
      })
    );
  }


  updateTask(updatedTask: Task): Observable<Task> {
    const url = `${this.apiUrl}/${updatedTask.id}`;
  
    return this.http.put<Task>(url, updatedTask).pipe(
      catchError((error: any) => {
        console.error('Error updating task:', error);
        throw error;
      }),
      map(() => {
        const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
  
        if (taskIndex !== -1) {
          const updatedTasks = [...this.tasks];
          updatedTasks[taskIndex] = updatedTask;
          this.tasks = updatedTasks;
        }
  
        console.log('Task updated:', updatedTask);
        return updatedTask;
      })
    );
  }
  

  deleteTask(id: number): Observable<any> {
    this.deletedtasks.push(id);
    this.getTasks();
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
