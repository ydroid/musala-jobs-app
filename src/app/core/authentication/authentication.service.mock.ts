import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';
import { Credentials } from './credentials.service';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    username: 'test',
    token: '123',
    id: '123'
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      username: context.username,
      token: '123456',
      id: '123'
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }
}
