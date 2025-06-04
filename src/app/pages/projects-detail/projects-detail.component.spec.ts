import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsDetailComponent } from './projects-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProjectsService } from 'app/services/projects/projects.service';
import { UsersService } from 'app/services/users/users.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProjectsDetailComponent', () => {
  let component: ProjectsDetailComponent;
  let fixture: ComponentFixture<ProjectsDetailComponent>;

  // Simulación de rutas con parámetro 'id'
  const activatedRouteStub = {
    snapshot: { paramMap: new Map([['id', '1']]) }
  };

  // Mocks de los servicios
  const mockProjectsService = {
    getProjectById: jasmine.createSpy('getProjectById').and.returnValue(of({ id: 1, nombre: 'Proyecto Test' })),
    unassignUserFromProject: jasmine.createSpy('unassignUserFromProject').and.returnValue(of({}))
  };

  const mockUsersService = {
    getAllUsers: jasmine.createSpy('getAllUsers').and.returnValue(of({ users: [{ id: 2, nombre: 'Usuario 1' }] }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientTestingModule],
      declarations: [ProjectsDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ProjectsService, useValue: mockProjectsService },
        { provide: UsersService, useValue: mockUsersService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ejecuta ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load project and users on init', () => {
    expect(mockProjectsService.getProjectById).toHaveBeenCalledWith(1);
    expect(mockUsersService.getAllUsers).toHaveBeenCalled();
    expect(component.project).toBeDefined();
    expect(component.allUsers.length).toBeGreaterThan(0);
  });

  it('should unassign a user correctly', () => {
    component.project = { id: 1, usuarios: [{ id: 2, nombre: 'Usuario 1' }] };
    component.unassignUser(2);

    expect(mockProjectsService.unassignUserFromProject).toHaveBeenCalledWith({ proyecto_id: 1, usuario_id: 2 });
  });
});

