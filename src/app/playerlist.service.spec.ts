import { TestBed, inject } from '@angular/core/testing';

import { PlayerlistService } from './playerlist.service';

describe('PlayerlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerlistService]
    });
  });

  it('should be created', inject([PlayerlistService], (service: PlayerlistService) => {
    expect(service).toBeTruthy();
  }));
});
