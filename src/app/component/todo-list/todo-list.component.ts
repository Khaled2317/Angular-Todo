import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { APIService } from 'src/app/service/api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  TaskObj = new Task();
  TaskList: Task[] = [];

  TaskValue = '';
  editedTaskValue= '';

  constructor(private apiService: APIService) {
  }

  ngOnInit(): void {
    this.resetParameters();
    this.fetchAll();
  }

  fetchAll() {
    this.apiService.getAllTasks().subscribe(
      (res) => {
        this.TaskList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  resetParameters() {
    this.TaskValue = '';
    this.TaskObj = new Task();
    this.editedTaskValue = '';
    this.TaskList = [];
  }
  addButton() {
    if (this.TaskValue == '') {
      return;
    }
    this.TaskObj.task_name = this.TaskValue;
    this.apiService.addTask(this.TaskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteButton(task: Task) {
    this.apiService.deleteTask(task).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editButton() {
    if (this.editedTaskValue == '') {
      return;
    }
    this.TaskObj.task_name = this.editedTaskValue;
    this.apiService.updateTask(this.TaskObj).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );

    var modal = document.getElementById('exampleModal');
    if(modal){
    modal.style.display = 'none';
    }
  }

  editView(aTask: Task) {
    var modal = document.getElementById('exampleModal');
    if(modal){
    modal.style.display = 'block';
    }
    this.TaskObj = aTask;
    this.editedTaskValue = aTask.task_name;
  }

  deleteAllButton() {
    for (let task of this.TaskList) {
      this.apiService.deleteTask(task).subscribe(
        (res) => {
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.hideModal();
  }

  hideModal(){
    var modal = document.getElementById('exampleModal');
    if(modal){
    modal.style.display = 'none';
    }
  }
}
