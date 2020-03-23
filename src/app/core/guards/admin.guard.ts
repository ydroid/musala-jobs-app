import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Logger } from '../logger.service';
import { AuthenticationService } from '../authentication/authentication.service';

const log = new Logger('AdminGuard');

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {}
  async canActivate() {
    const isAdmin = await this.authenticationService.isAdmin();
    if (isAdmin) {
      return true;
    }

    log.debug('Insufficient permits, redirecting...');
    this.router.navigate(['/401']);
    return false;
  }
}
