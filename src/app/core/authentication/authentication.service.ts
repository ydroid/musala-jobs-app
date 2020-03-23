import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants/constants';
import { Account } from '../models/account';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private http: HttpClient) {}

  login(context: LoginContext): Observable<Account> {
    return this.http
      .post<any>(
        Constants.LOGIN_URL,
        { email: context.username, password: context.password },
        { params: { include: 'USER' } }
      )
      .pipe(
        map(data => {
          const _credentials: Credentials = {
            username: `${data.user.firstName} ${data.user.lastName}`,
            token: data.id,
            id: data.user.id
          };
          this.credentialsService.setCredentials(_credentials, context.remember);
          return data.user;
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(Constants.LOGOUT_URL, '', {
      params: {
        access_token: this.credentialsService.credentials.token
      }
    });
  }

  loginWithGoogle(accessToken: string): Observable<Account> {
    return this.http
      .post<any>(Constants.LOGIN_GOOGLE_URL, { provider: 'google', accessToken })
      .pipe(
        map(data => {
          const _credentials: Credentials = {
            username: `${data.user.firstName} ${data.user.lastName}`,
            token: data.id,
            id: data.user.id
          };
          this.credentialsService.setCredentials(_credentials, false);
          return data.user;
        })
      );
  }

  async isAdmin() {
    const response = await this.http
      .get<Account>(Constants.ACCOUNT_URL + `${this.credentialsService.credentials.id}`)
      .toPromise();
    return response.roleMapping.role.name === 'Admin';
  }
}
