import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';

import { AuthenticationService, CredentialsService, CoreModule } from '@app/core';
import { MockAuthenticationService } from '@app/core/authentication/authentication.service.mock';
import { MockCredentialsService } from '@app/core/authentication/credentials.service.mock';

import { ShellComponent } from './shell.component';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire';
import { FirebaseAuthService } from '@app/core/authentication/firebase-auth.service';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        AvatarModule,
        CoreModule,
        HttpClientTestingModule,
        AngularFireModule,
        AngularFireStorageModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: new MockAuthenticationService() },
        { provide: FirebaseAuthService, useValue: {} },
        { provide: CredentialsService, useValue: new MockCredentialsService() },
        { provide: AngularFireStorage, useValue: {} }
      ],
      declarations: [ShellComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
