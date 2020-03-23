import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService, untilDestroyed } from '@app/core';
import { FirebaseAuthService } from '@app/core/authentication/firebase-auth.service';
import { SharedAccountInfoService } from '@app/core/services/shared-account-info.service';
import { musalaAnimations } from 'src/animations';

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: musalaAnimations
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  isLoadingG = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private authService: FirebaseAuthService,
    private sharedAInfoService: SharedAccountInfoService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        account => {
          log.debug(account);
          this.sharedAInfoService.sendAccount(account);
          this.router.navigate([this.route.snapshot.queryParams.redirect || '/all-projects'], { replaceUrl: true });
        },
        error => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  async loginWithGoogle() {
    try {
      this.isLoadingG = true;
      const accountData = await this.authService.GoogleAuth();
      const login$ = this.authenticationService.loginWithGoogle(accountData.credential.idToken);
      login$
        .pipe(
          finalize(() => {
            this.loginForm.markAsPristine();
            this.isLoadingG = false;
          }),
          untilDestroyed(this)
        )
        .subscribe(
          account => {
            this.sharedAInfoService.sendAccount(account);
            this.router.navigate([this.route.snapshot.queryParams.redirect || '/all-projects'], { replaceUrl: true });
          },
          error => {
            log.debug(error);
            this.error = error;
          }
        );
    } catch (error) {
      log.error(error);
      this.isLoadingG = false;
    }
  }
  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: true
    });
  }
}
