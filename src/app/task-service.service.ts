import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';

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
  //private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private apiUrl = 'http://localhost/api/get_data.php';
  private nextId = 1;

  tasks: Task[] = [];
  deletedtasks: number[] = [];

  getNextId(): number {
    return this.nextId++;
  }

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
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
  
    return this.http.put<Task>(this.apiUrl, updatedTask).pipe(
      catchError((error: any) => {
        console.error('Error updating task:', error);
        throw error;
      }),
      map(() => {  
        console.log('Task updated:', updatedTask);
        return updatedTask;
      })
    );
  }
  

  deleteTask(id: number): Observable<any> {
    this.deletedtasks.push(id);
    this.getTasks();
    const url = `${this.apiUrl}?id=${id}`;
    return this.http.delete(url);
  }
}
