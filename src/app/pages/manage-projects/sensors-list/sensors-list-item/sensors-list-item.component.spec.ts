import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsListItemComponent } from './sensors-list-item.component';

describe('SensorsListItemComponent', () => {
  let component: SensorsListItemComponent;
  let fixture: ComponentFixture<SensorsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
