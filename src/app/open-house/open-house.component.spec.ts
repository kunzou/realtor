import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenHouseComponent } from './open-house.component';


describe('OpenHouseComponent', () => {
  let component: OpenHouseComponent;
  let fixture: ComponentFixture<OpenHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
