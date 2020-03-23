import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule, CoreModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { UploadImageComponent } from './upload-image-profile/upload-image-profile.component';
import { WorkedProjectsComponent } from './worked-projects/worked-projects.component';
import { TasksDialogComponent } from './worked-projects/tasks-dialog/tasks-dialog.component';
import { AvatarModule, AvatarService } from 'ngx-avatar';
import { NgxUploaderModule } from 'ngx-uploader';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireStorage } from '@angular/fire/storage';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FlexLayoutModule,
        MaterialModule,
        CoreModule,
        ReactiveFormsModule,
        SharedModule,
        BrowserAnimationsModule,
        AvatarModule,
        NgxUploaderModule,
        HttpClientTestingModule
      ],
      providers: [{ provide: AngularFireStorage, useValue: {} }],
      declarations: [
        ProfileComponent,
        MyProjectsComponent,
        UploadImageComponent,
        WorkedProjectsComponent,
        TasksDialogComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
