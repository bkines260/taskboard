import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TasksService } from './tasks.service';

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
    req.flush({ id: 2, title: 'B', done: false });
    expect(service.tasks()).toEqual([{ id: 2, title: 'B', done: false }]);
  });

  it('setDone should PATCH /api/tasks/:id', () => {
    service.setDone(3, true).subscribe();
    const req = httpMock.expectOne('/api/tasks/3');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ done: true });
    req.flush({ id: 3, title: 'C', done: true });
  });
});
