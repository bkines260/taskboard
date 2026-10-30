import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TasksService, formatDueDate } from './tasks.service';

describe('formatDueDate', () => {
  it('should format YYYY-MM-DD as DD/MM/YYYY', () => {
    expect(formatDueDate('2026-11-05')).toBe('05/11/2026');
  });

  it('should return an empty string when there is no due date', () => {
    expect(formatDueDate(null)).toBe('');
  });
});

describe('TasksService', () => {
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getTasks should GET /api/tasks', () => {
    service.getTasks().subscribe();
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1, title: 'A', done: false }]);
    expect(service.tasks().length).toBe(1);
  });

  it('addTask should POST /api/tasks', () => {
    service.addTask('B').subscribe();
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title: 'B' });
    req.flush({ id: 2, title: 'B', done: false, dueDate: null });
    expect(service.tasks()).toEqual([{ id: 2, title: 'B', done: false, dueDate: null }]);
  });

  it('addTask should send the dueDate when provided', () => {
    service.addTask('B', '2026-11-15').subscribe();
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.body).toEqual({ title: 'B', dueDate: '2026-11-15' });
    req.flush({ id: 2, title: 'B', done: false, dueDate: '2026-11-15' });
    expect(service.tasks()[0].dueDate).toBe('2026-11-15');
  });

  it('setDone should PATCH /api/tasks/:id', () => {
    service.setDone(3, true).subscribe();
    const req = httpMock.expectOne('/api/tasks/3');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ done: true });
    req.flush({ id: 3, title: 'C', done: true, dueDate: null });
  });
});
