import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { ApiResponse } from '../models/apiResponse';
import { User } from '../models/user';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user properties', () => {
    const userId = 1;
    const mockResponse: ApiResponse = {
      success: true,
      user: { id: 1, username: 'testUser', email: 'test@example.com' }, // Updated user object
      message: '',
      listings: []
    };

    service.getUserProperties(userId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/listings/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should delete a user', () => {
    const userId = 1;
    const mockResponse: ApiResponse = {
      success: true,
      user: { id: 1, username: 'testUser', email: 'test@example.com' }, // Updated user object
      message: 'User deleted',
      listings: []
    };

    service.deleteUser(userId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/delete/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should update a user', () => {
    const userId = 1;
    const mockResponse: ApiResponse = {
      success: true,
      user: { id: 1, username: 'testUser', email: 'test@example.com' }, // Updated user object
      message: 'User updated',
      listings: []
    };
    const updatedUser = { username: 'newUsername', email: 'newEmail@example.com' };

    service.updateUser(userId, updatedUser.username, updatedUser.email).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/update/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse);
  });

  it('should get a user', () => {
    const userId = 1;
    const mockResponse: ApiResponse = {
      success: true,
      user: { id: 1, username: 'testUser', email: 'test@example.com' }, // Updated user object
      message: '',
      listings: []
    };

    service.getUser(userId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
