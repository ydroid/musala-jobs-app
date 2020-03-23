import { Component, OnInit, OnDestroy } from '@angular/core';
import { musalaAnimations } from 'src/animations';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { confirmPasswordValidator } from '@app/core/validators/notEqualValues.validator';
import { AccountService } from '@app/profile/account.service';
import { Logger, AuthenticationService, untilDestroyed } from '@app/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '@app/core/authentication/firebase-auth.service';
import { SharedAccountInfoService } from '@app/core/services/shared-account-info.service';
import { finalize } from 'rxjs/operators';
const log = new Logger('Register');
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: musalaAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  isLoadingG = false;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: FirebaseAuthService,
    private sharedAInfoService: SharedAccountInfoService,
    private authenticationService: AuthenticationService
  ) {
    this.createForm();
  }

  ngOnInit() {}
  ngOnDestroy() {}

  save() {
    const newUser = this.registerForm.value;
    delete newUser.passwordConfirm;
    delete newUser.terms;
    this.accountService.addAccount(newUser).subscribe(
      data => {
        log.debug(data);
        this.router.navigate(['register/finish']);
      },
      error => {
        log.error(error);
        if (error.error && error.error.error && error.error.error.statusCode === 422) {
          this.snackBar.open('Email already exists', '', { duration: 3000 });
        } else {
          this.snackBar.open('Upps Something go wrong', '', { duration: 3000 });
        }
      }
    );
  }
  async loginWithGoogle() {
    try {
      this.isLoadingG = true;
      const accountData = await this.authService.GoogleAuth();
      log.debug(accountData.credential.idToken);
      const login$ = this.authenticationService.loginWithGoogle(accountData.credential.idToken);
      login$
        .pipe(
          finalize(() => {
            this.isLoadingG = false;
          }),
          untilDestroyed(this)
        )
        .subscribe(
          account => {
            this.sharedAInfoService.sendAccount(account);
            this.router.navigate(['/all-projects'], { replaceUrl: true });
          },
          error => {
            log.debug(error);
          }
        );
    } catch (error) {
      log.error(error);
      this.isLoadingG = false;
    }
  }
  private createForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
      socialAccount: [false],
      terms: [false, [Validators.requiredTrue]]
    });
  }
}
