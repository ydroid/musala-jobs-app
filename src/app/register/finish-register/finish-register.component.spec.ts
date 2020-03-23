import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishRegisterComponent } from './finish-register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@app/material.module';

describe('FinishRegisterComponent', () => {
  let component: FinishRegisterComponent;
  let fixture: ComponentFixture<FinishRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      declarations: [FinishRegisterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
