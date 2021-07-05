import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PondsListItemComponent } from './ponds-list-item.component';

describe('PondsListItemComponent', () => {
  let component: PondsListItemComponent;
  let fixture: ComponentFixture<PondsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PondsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PondsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
