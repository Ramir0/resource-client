import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setTokens(access_token: string, refresh_token: string): void {
    this.deleteTokens();
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
  }

  deleteTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(ACCESS_TOKEN) != null;
  }

  isAdmin(): boolean {
    const token: string | null = this.getAccessToken();
    if (token == null) {
      return false;
    }
    const payload = token.split('.')[1];
    const payloadDecoded = window.atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles: Array<string> = values['roles'];
    
    return roles.indexOf('ROLE_ADMIN') >= 0;
  }
}
