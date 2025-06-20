import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class TokenValidationService {

  constructor() { }

  validateToken(token: string): boolean {
    try {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp ? decodedToken.exp : 0; // Get expiration time from token, default to 0 if not present
      const currentTime = Date.now() / 1000;

      return currentTime < expirationTime; // Check if the token is still valid
    } catch (error) {
      console.error('Token validation error:', error);
      return false; // Token is invalid
    }
  }
}
