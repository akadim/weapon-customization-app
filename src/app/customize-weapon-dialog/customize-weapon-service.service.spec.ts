import { TestBed } from '@angular/core/testing';

import { CustomizeWeaponServiceService } from './customize-weapon-service.service';

describe('CustomizeWeaponServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomizeWeaponServiceService = TestBed.get(CustomizeWeaponServiceService);
    expect(service).toBeTruthy();
  });
});
