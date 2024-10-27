import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayuserdetailsComponent } from './displayuserdetails.component';

describe('DisplayuserdetailsComponent', () => {
  let component: DisplayuserdetailsComponent;
  let fixture: ComponentFixture<DisplayuserdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayuserdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayuserdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
