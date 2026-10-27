import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  private readonly tasksService = inject(TasksService);
  title = '';

  add(): void {
    const title = this.title.trim();
    if (!title) {
      return;
    }
    this.tasksService.addTask(title).subscribe(() => (this.title = ''));
  }
}
