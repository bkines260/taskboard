import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should POST the title and clear the field', () => {
    component.title = 'Nouvelle tâche';
    component.add();
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.body).toEqual({ title: 'Nouvelle tâche' });
    req.flush({ id: 1, title: 'Nouvelle tâche', done: false, dueDate: null });
    expect(component.title).toBe('');
  });

  it('should POST the dueDate when set and clear both fields', () => {
    component.title = 'Rendre le rapport';
    component.dueDate = '2026-11-15';
    component.add();
    const req = httpMock.expectOne('/api/tasks');
    expect(req.request.body).toEqual({ title: 'Rendre le rapport', dueDate: '2026-11-15' });
    req.flush({ id: 2, title: 'Rendre le rapport', done: false, dueDate: '2026-11-15' });
    expect(component.title).toBe('');
    expect(component.dueDate).toBe('');
  });
});
