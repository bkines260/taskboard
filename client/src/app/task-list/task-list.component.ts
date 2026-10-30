import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-list',
  imports: [DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  private readonly tasksService = inject(TasksService);
  readonly tasks = this.tasksService.tasks;

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe();
  }

  toggle(id: number, done: boolean): void {
    this.tasksService.setDone(id, done).subscribe();
  }
}
