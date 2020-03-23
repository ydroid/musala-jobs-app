import { Component, OnInit, Inject } from '@angular/core';
import { Account } from '@app/core/models/account';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '@app/core/validators/notEqualValues.validator';
import { AccountService } from '@app/profile/account.service';
import { finalize } from 'rxjs/operators';
import { Logger } from '@app/core';

const log = new Logger('User Dialog');
interface DialogData {
  account: Account;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  accountForm: FormGroup;
  isLoading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.loadData();
  }
  save() {
    this.data.account === null ? this.addUser() : this.updateUser();
  }
  addUser() {
    const newUser = this.accountForm.value;
    delete newUser.passwordConfirm;

    this.accountService.addAccount(this.accountForm.value).subscribe(
      data => {
        this.close(data);
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
  updateUser() {
    this.isLoading = true;
    this.accountService
      .updateAccount(this.data.account.id, this.accountForm.value)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        data => {
          this.close(data);
        },
        error => {
          log.error(error);
          this.snackBar.open('Upps Something go wrong', '', {
            duration: 3000
          });
        }
      );
  }
  close(isSaved: any) {
    this.dialogRef.close(isSaved);
  }
  private loadData() {
    if (this.data.account) {
      this.accountForm.controls.firstName.setValue(this.data.account.firstName);
      this.accountForm.controls.lastName.setValue(this.data.account.lastName);
      this.accountForm.controls.email.setValue(this.data.account.email);
      if (this.data.account.socialAccount) {
        this.accountForm.controls.email.disable();
      }
    }
  }
  private createForm() {
    this.accountForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      socialAccount: [false]
    });
    if (!this.data.account) {
      this.accountForm.addControl('password', new FormControl('', [Validators.required, Validators.minLength(6)]));
      this.accountForm.addControl(
        'passwordConfirm',
        new FormControl('', [Validators.required, confirmPasswordValidator])
      );
    }
  }
}
