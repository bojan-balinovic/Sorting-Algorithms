import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeAdjusterComponent } from './volume-adjuster.component';

describe('VolumeAdjusterComponent', () => {
  let component: VolumeAdjusterComponent;
  let fixture: ComponentFixture<VolumeAdjusterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolumeAdjusterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolumeAdjusterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
