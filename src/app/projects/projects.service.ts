import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '@app/core/constants/constants';
import { Observable } from 'rxjs';
import { Project } from '@app/core/models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient) {}
  getProjects(limit: number, skip: number, searchTerm: string, order: string): Observable<Project[]> {
    const filter = {
      include: 'projectType',
      order,
      limit,
      skip,
      where: {
        and: [
          { workedId: {} },
          {
            or: [
              {
                title: {
                  like: searchTerm,
                  options: 'i'
                }
              },
              {
                description: searchTerm,
                options: 'i'
              }
            ]
          }
        ]
      }
    };
    return this.http.get<Project[]>(Constants.PROJECT_URL, {
      params: {
        filter: JSON.stringify(filter)
      }
    });
  }
  getTotalProjects(searchTerm: string): Observable<any> {
    const filter = {
      and: [
        { workedId: {} },
        {
          or: [
            {
              title: {
                like: searchTerm,
                options: 'i'
              }
            },
            {
              description: searchTerm,
              options: 'i'
            }
          ]
        }
      ]
    };

    return this.http.get<any>(Constants.PROJECT_URL + 'count', {
      params: {
        where: JSON.stringify(filter)
      }
    });
  }
  getProject(projectId: string): Observable<Project> {
    const filter = {
      include: ['projectType', { owner: ['projects'] }]
    };
    return this.http.get<Project>(Constants.PROJECT_URL + projectId, { params: { filter: JSON.stringify(filter) } });
  }
  updateProject(projectId: string, data: any): Observable<Project> {
    return this.http.patch<Project>(Constants.PROJECT_URL + projectId, data);
  }
  addProject(data: any): Observable<Project> {
    return this.http.post<Project>(Constants.PROJECT_URL, data);
  }
  deleteProject(projectId: string) {
    return this.http.delete(Constants.PROJECT_URL + projectId);
  }
  getAllProjects(limit: number, skip: number, searchTerm: string, order: string): Observable<Project[]> {
    const filter = {
      include: 'projectType',
      order,
      limit,
      skip,
      where: {
        or: [
          {
            title: {
              like: searchTerm,
              options: 'i'
            }
          },
          {
            description: searchTerm,
            options: 'i'
          }
        ]
      }
    };
    return this.http.get<Project[]>(Constants.PROJECT_URL, {
      params: {
        filter: JSON.stringify(filter)
      }
    });
  }
  getTotalAllProjects(searchTerm: string): Observable<any> {
    const filter = {
      or: [
        {
          title: {
            like: searchTerm,
            options: 'i'
          }
        },
        {
          description: searchTerm,
          options: 'i'
        }
      ]
    };

    return this.http.get<any>(Constants.PROJECT_URL + 'count', {
      params: {
        where: JSON.stringify(filter)
      }
    });
  }
}
