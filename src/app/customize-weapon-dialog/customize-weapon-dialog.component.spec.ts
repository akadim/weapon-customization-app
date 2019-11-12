import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeWeaponDialogComponent } from './customize-weapon-dialog.component';

describe('CustomizeWeaponDialogComponent', () => {
  let component: CustomizeWeaponDialogComponent;
  let fixture: ComponentFixture<CustomizeWeaponDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeWeaponDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeWeaponDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
