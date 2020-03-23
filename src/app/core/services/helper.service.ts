import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants/constants';
import { Observable } from 'rxjs';
import { Role } from '../models/role';
import { ProjectType } from '../models/projectType';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(private http: HttpClient) {}
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(Constants.ROLE_URL);
  }
  getProjectTypes(): Observable<ProjectType[]> {
    return this.http.get<ProjectType[]>(Constants.PROJECT_TYPE_URL);
  }
}
