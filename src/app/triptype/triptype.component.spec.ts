import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriptypeComponent } from './triptype.component';

describe('TriptypeComponent', () => {
  let component: TriptypeComponent;
  let fixture: ComponentFixture<TriptypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriptypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
