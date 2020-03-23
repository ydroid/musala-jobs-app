import { Injectable } from '@angular/core';
import { Constants } from '../constants/constants';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private _credentials: Credentials | null = null;

  constructor() {
    const savedCredentials =
      sessionStorage.getItem(Constants.CREDENTIALS_KEY) || localStorage.getItem(Constants.CREDENTIALS_KEY);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  get credentials(): Credentials | null {
    return this._credentials;
  }

  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(Constants.CREDENTIALS_KEY, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(Constants.CREDENTIALS_KEY);
      localStorage.removeItem(Constants.CREDENTIALS_KEY);
    }
  }
}
