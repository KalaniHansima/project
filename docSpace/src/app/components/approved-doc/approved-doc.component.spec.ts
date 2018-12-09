import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDocComponent } from './approved-doc.component';

describe('ApprovedDocComponent', () => {
  let component: ApprovedDocComponent;
  let fixture: ComponentFixture<ApprovedDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
