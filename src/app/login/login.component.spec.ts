import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule, CredentialsService, AuthenticationService } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { LoginComponent } from './login.component';
import { MockAuthenticationService } from '@app/core/authentication/authentication.service.mock';
import { MockCredentialsService } from '@app/core/authentication/credentials.service.mock';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FirebaseAuthService } from '@app/core/authentication/firebase-auth.service';
import { AngularFireStorage } from '@angular/fire/storage';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        SharedModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        CoreModule,
        AngularFireAuthModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: new MockAuthenticationService() },
        { provide: CredentialsService, useValue: new MockCredentialsService() },
        { provide: FirebaseAuthService, useValue: {} },
        { provide: AngularFireStorage, useValue: {} }
      ],
      declarations: [LoginComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
