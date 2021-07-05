import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PondsListComponent } from './ponds-list.component';

describe('PondsListComponent', () => {
  let component: PondsListComponent;
  let fixture: ComponentFixture<PondsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PondsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PondsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
