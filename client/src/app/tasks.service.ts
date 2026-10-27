import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/tasks';

  readonly tasks = signal<Task[]>([]);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(tap((tasks) => this.tasks.set(tasks)));
  }

  addTask(title: string): Observable<Task> {
    return this.http
      .post<Task>(this.apiUrl, { title })
      .pipe(tap((task) => this.tasks.update((list) => [...list, task])));
  }

  setDone(id: number, done: boolean): Observable<Task> {
    return this.http
      .patch<Task>(`${this.apiUrl}/${id}`, { done })
      .pipe(
        tap((updated) =>
          this.tasks.update((list) => list.map((t) => (t.id === updated.id ? updated : t)))
        )
      );
  }
}
