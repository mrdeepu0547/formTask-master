import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsListComponent } from './ps-list.component';

describe('PsListComponent', () => {
  let component: PsListComponent;
  let fixture: ComponentFixture<PsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
