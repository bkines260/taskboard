import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  done: boolean;
  dueDate: string | null;
}

// Formats a YYYY-MM-DD due date as DD/MM/YYYY, without going through Date (avoids timezone shifts).
export function formatDueDate(dueDate: string | null): string {
  if (!dueDate) {
    return '';
  }
  const [year, month, day] = dueDate.split('-');
  return `${day}/${month}/${year}`;
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

  addTask(title: string, dueDate?: string): Observable<Task> {
    const body = dueDate ? { title, dueDate } : { title };
    return this.http
      .post<Task>(this.apiUrl, body)
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
