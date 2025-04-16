import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { ApiResponse } from '../models/apiResponse';
import { MessageService } from './message.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['showAlert']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: MessageService, useValue: messageServiceSpy }
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const mockResponse: ApiResponse = { 
      success: true, 
      user: { id: 1, username: 'testUser', email: 'test@example.com' }, 
      message: 'Login successful', 
      listings: [] 
    };

    service.login('testUser', 'password').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should register', () => {
    const mockResponse: ApiResponse = { 
      success: true, 
      user: { id: 1, username: 'testUser', email: 'test@example.com' }, 
      message: 'Registration successful', 
      listings: [] 
    };
    const userData = { username: 'testUser', password: 'password', email: 'test@example.com' };

    service.register(userData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout', () => {
    const mockResponse: ApiResponse = { 
      success: true, 
      user: { id: 1, username: 'testUser', email: 'test@example.com' }, 
      message: 'Logout successful', 
      listings: [] 
    };

    service.logout().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/logout`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should check if user is authenticated', () => {
    service['currentUser'] = { id: 1, username: 'testUser', email: 'test@example.com' }; // Simulate a logged-in user
    expect(service.isAuthenticated()).toBeTrue();

    service['currentUser'] = null; // Simulate a logged-out user
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should get current user', () => {
    const user = { id: 1, username: 'testUser', email: 'test@example.com' };
    service['currentUser'] = user; // Simulate a logged-in user

    expect(service.getCurrentUser()).toEqual(user);
  });

  it('should sign in with Google', () => {
    const mockResponse: ApiResponse = { 
      success: true, 
      user: { id: 1, username: 'testUser', email: 'test@example.com' }, 
      message: 'Google sign-in successful', 
      listings: [] 
    };

    service.signInWithGoogle().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/google`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should signup', () => {
    const mockResponse: ApiResponse = { 
      success: true, 
      user: { id: 1, username: 'testUser', email: 'test@example.com' }, 
      message: 'Signup successful', 
      listings: [] 
    };
    const userData = { username: 'testUser', password: 'password', email: 'test@example.com' };

    service.signup(userData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
