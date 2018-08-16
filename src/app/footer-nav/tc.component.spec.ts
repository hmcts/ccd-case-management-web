import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcComponent } from './tc.component';

describe('TcComponent', () => {
  let component: TcComponent;
  let fixture: ComponentFixture<TcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
