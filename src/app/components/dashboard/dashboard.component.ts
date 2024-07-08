import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
   
  taskObj:Todo = new Todo();
  taskArr:Todo[]=[];

  addTaskData:string = '';

  constructor(private api:TaskService){}


  ngOnInit(): void {
    this.taskObj = new Todo();
    this.getAllTask();
    this.taskArr = [];

  }
  addTask(){
    this.taskObj.task = this.addTaskData
   this.api.addTask(this.taskObj).subscribe(res=>{
    this.ngOnInit();
    this.addTaskData = ''
   },err=>{
    alert(err);
   })
  }

  getAllTask(){
    this.api.getAllTask().subscribe(res=>{
    this.taskArr=res;
    },err=>{
     alert('Unable to find task')
    })
  }

  editTask(){
    this.api.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
    },err => {
      alert('Unable to update Task');
    })
  }

  deleteTask(task:Todo){
    this.api.delete(task).subscribe(res => {
      this.ngOnInit();
    },err =>{
      alert('Failed to delete a task')
    })
  }
}
