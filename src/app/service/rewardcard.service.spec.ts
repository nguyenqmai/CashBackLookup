import { TestBed } from '@angular/core/testing';

import { RewardCardService } from './rewardcard.service';

describe('CardInfoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RewardCardService = TestBed.get(RewardCardService);
    expect(service).toBeTruthy();
  });
});
