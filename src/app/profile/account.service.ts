import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '@app/core/constants/constants';
import { Account } from '../core/models/account';
import { Observable } from 'rxjs';
import { Project } from '@app/core/models/project';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) {}
  getAccounts(limit: number, skip: number, searchTerm: string, order: string): Observable<Account[]> {
    return this.http.get<Account[]>(Constants.ACCOUNT_URL, {
      params: {
        filter: `{"order": "${order}", "limit": ${limit}, "skip": ${skip},
                  "where": {"or": [{"firstName": {"like": "${searchTerm}", "options": "i"}},
                                   {"lastName": {"like": "${searchTerm}", "options": "i"}}]}}`
      }
    });
  }
  getTotalAccounts(searchTerm: string): Observable<any> {
    return this.http.get<any>(Constants.ACCOUNT_URL + 'count', {
      params: {
        where: `{"or": [{"firstName": {"like": "${searchTerm}", "options": "i"}},
                                   {"lastName": {"like": "${searchTerm}", "options": "i"}}]}`
      }
    });
  }
  getAccount(accountId: string): Observable<Account> {
    return this.http.get<Account>(Constants.ACCOUNT_URL + accountId);
  }
  async getAccountAsync(accountId: string) {
    return await this.http.get<Account>(Constants.ACCOUNT_URL + accountId).toPromise();
  }
  updateAccount(accountId: string, data: any): Observable<Account> {
    return this.http.patch<Account>(Constants.ACCOUNT_URL + accountId, data);
  }
  addAccount(data: any): Observable<Account> {
    return this.http.post<Account>(Constants.ACCOUNT_URL, data);
  }
  deleteAccount(accountId: string) {
    return this.http.delete(Constants.ACCOUNT_URL + accountId);
  }
  updateRole(accountId: string, roleId: string) {
    return this.http.put(`${Constants.ACCOUNT_URL}${accountId}/roleMapping`, { roleId });
  }
  getMyProjects(
    accountId: string,
    limit: number,
    skip: number,
    searchTerm: string,
    order: string
  ): Observable<Project[]> {
    return this.http.get<Project[]>(`${Constants.ACCOUNT_URL}${accountId}/projects`, {
      params: {
        filter: `{"include": "projectType", "order": "${order}", "limit": ${limit}, "skip": ${skip},
                  "where": {"or": [{"title": {"like": "${searchTerm}", "options": "i"}},
                                   {"description": {"like": "${searchTerm}", "options": "i"}}]}}`
      }
    });
  }
  getTotalMyProjects(accountId: string, searchTerm: string): Observable<any> {
    return this.http.get<any>(`${Constants.ACCOUNT_URL}${accountId}/projects/count`, {
      params: {
        where: `{"or": [{"title": {"like": "${searchTerm}", "options": "i"}},
                        {"description": {"like": "${searchTerm}", "options": "i"}}]}`
      }
    });
  }
  getWorkedProjects(
    accountId: string,
    limit: number,
    skip: number,
    searchTerm: string,
    order: string
  ): Observable<Project[]> {
    return this.http.get<Project[]>(`${Constants.ACCOUNT_URL}${accountId}/workedProjects`, {
      params: {
        filter: `{"include": "projectType", "order": "${order}", "limit": ${limit}, "skip": ${skip},
                  "where": {"or": [{"title": {"like": "${searchTerm}", "options": "i"}},
                                   {"description": {"like": "${searchTerm}", "options": "i"}}]}}`
      }
    });
  }
  getTotalWorkedProjects(accountId: string, searchTerm: string): Observable<any> {
    return this.http.get<any>(`${Constants.ACCOUNT_URL}${accountId}/workedProjects/count`, {
      params: {
        where: `{"or": [{"title": {"like": "${searchTerm}", "options": "i"}},
                        {"description": {"like": "${searchTerm}", "options": "i"}}]}`
      }
    });
  }
}
