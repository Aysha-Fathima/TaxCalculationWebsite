import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAdashboardComponent } from './cadashboard.component';

describe('CAdashboardComponent', () => {
  let component: CAdashboardComponent;
  let fixture: ComponentFixture<CAdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CAdashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CAdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
