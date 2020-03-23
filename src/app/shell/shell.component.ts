import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';

import { AuthenticationService, CredentialsService, I18nService, Logger } from '@app/core';
import { SharedAccountInfoService } from '@app/core/services/shared-account-info.service';
import { Account } from '@app/core/models/account';
import { SubSink } from 'subsink';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

const log = new Logger('Shell');
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  account: Account;
  subs = new SubSink();
  // avatarUrl: string;
  constructor(
    private router: Router,
    private titleService: Title,
    public media: MediaObserver,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService,
    private sharedAInfoService: SharedAccountInfoService,
    private credentialsService: CredentialsService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.subs.sink = this.sharedAInfoService.getAccountObs().subscribe(data => {
      if (data) {
        this.account = data;
      }
    });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => {
      this.credentialsService.setCredentials();
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
