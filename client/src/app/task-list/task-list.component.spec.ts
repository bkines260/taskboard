import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should display tasks with a checkbox', () => {
    httpMock.expectOne('/api/tasks').flush([{ id: 1, title: 'A', done: true, dueDate: null }]);
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(fixture.nativeElement.textContent).toContain('A');
    expect(checkbox.checked).toBeTrue();
    expect(fixture.nativeElement.querySelector('.tb-item__due')).toBeNull();
    expect(component).toBeTruthy();
  });

  it('should display the due date when present', () => {
    httpMock
      .expectOne('/api/tasks')
      .flush([{ id: 1, title: 'A', done: false, dueDate: '2026-11-15' }]);
    fixture.detectChanges();
    const due = fixture.nativeElement.querySelector('.tb-item__due') as HTMLElement;
    expect(due.textContent?.trim()).toBe('15/11/2026');
  });

  it('toggle should PATCH the task with the new done value', () => {
    httpMock.expectOne('/api/tasks').flush([{ id: 1, title: 'A', done: false, dueDate: null }]);
    component.toggle(1, true);
    const req = httpMock.expectOne('/api/tasks/1');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ done: true });
    req.flush({ id: 1, title: 'A', done: true, dueDate: null });
  });
});
