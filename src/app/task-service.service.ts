import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts/';

  constructor(private http: HttpClient) {}

  getTasks(limit: number = 5): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API Error:', error);
        return throwError('An error occurred while fetching tasks.');
      })
    );
  }

  getTaskById(id: number): Observable<Task> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Task>(url);
  }

  createTask(taskData: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, taskData);
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const url = `${this.apiUrl}/${updatedTask.id}`;
    return this.http.put<Task>(url, updatedTask);
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
