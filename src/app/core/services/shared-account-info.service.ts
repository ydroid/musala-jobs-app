import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Logger } from '../logger.service';
import { Account } from '../models/account';
import { Constants } from '../constants/constants';
import { AccountService } from '@app/profile/account.service';
import { AngularFireStorageReference, AngularFireStorage } from '@angular/fire/storage';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

const log = new Logger('Shared Account Info Service');

@Injectable({
  providedIn: 'root'
})
export class SharedAccountInfoService {
  _accountInfo: Account;
  private subject = new BehaviorSubject(this._accountInfo);
  constructor(private accountService: AccountService, private storage: AngularFireStorage, private router: Router) {
    const savedCredentials =
      sessionStorage.getItem(Constants.CREDENTIALS_KEY) || localStorage.getItem(Constants.CREDENTIALS_KEY);
    if (savedCredentials) {
      const _credentials = JSON.parse(savedCredentials);
      this.getAccountAsync(_credentials);
    }
  }

  sendAccount(accountInfo: Account) {
    this._accountInfo = accountInfo;
    this.avatarUrl();
  }

  getAccountObs(): Observable<Account> {
    return this.subject.asObservable();
  }

  getAccount() {
    return this._accountInfo;
  }

  isAdmin() {
    return this._accountInfo && this._accountInfo.role === 1;
  }
  private async getAccountAsync(_credentials: any) {
    try {
      this._accountInfo = await this.accountService.getAccountAsync(_credentials.id);
      this.avatarUrl();
    } catch (error) {
      log.error(error);
      sessionStorage.removeItem(Constants.CREDENTIALS_KEY);
      localStorage.removeItem(Constants.CREDENTIALS_KEY);
      this.router.navigate(['/login']);
    }
  }
  private avatarUrl() {
    const pattern = /^((http|https|ftp):\/\/)/;
    if (this._accountInfo.avatarUrl && !pattern.test(this._accountInfo.avatarUrl)) {
      const fileRef = this.storage.ref(this._accountInfo.avatarUrl);
      this.updateAvatarUrl(fileRef);
    } else {
      this.refresh();
    }
  }

  private refresh() {
    this.subject.next(this._accountInfo);
  }
  private updateAvatarUrl(fileRef: AngularFireStorageReference) {
    fileRef.getDownloadURL().subscribe(
      downloadURL => {
        this._accountInfo.avatarUrl = downloadURL;
        this.refresh();
      },
      error => {
        log.error(error);
        this._accountInfo.avatarUrl = null;
        this.refresh();
      }
    );
  }
}
