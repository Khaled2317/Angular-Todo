import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  endPoint = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) { 

  }

  addTask(task: Task) : Observable<Task> {
    return this.http.post<Task>(this.endPoint, task);
  }

  getAllTasks() : Observable<Task[]> {
    return this.http.get<Task[]>(this.endPoint);
  }
  deleteTask(task: Task) : Observable<Task> {
    return this.http.delete<Task>(`${this.endPoint}/${task.id}`);
  }
  updateTask(task: Task) : Observable<Task> {
    return this.http.put<Task>(`${this.endPoint}/${task.id}`, task);
  }

}
