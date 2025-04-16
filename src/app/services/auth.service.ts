import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';
import { environment } from '../../enviornment/enviornment'; // Corrected path

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/api/auth'; // Ensure apiUrl is used
  private currentUser: any; // To store the current user information

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/login`, { username, password });
  }

  register(userData: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/register`, userData);
  }

  logout(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/logout`, {});
  }

  isAuthenticated(): boolean {
    return !!this.currentUser; // Check if the current user is set
  }

  getCurrentUser(): any {
    return this.currentUser; // Return the current user information
  }

  signInWithGoogle(): Observable<ApiResponse> {
    // Implement Google sign-in logic here
    return this.http.post<ApiResponse>(`${this.baseUrl}/google`, {});
  }

  logoutLocally(): void {
    this.currentUser = null; // Clear the current user information
  }

  signup(userData: { username: string; email: string; password: string }): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/register`, userData);
  }
}
