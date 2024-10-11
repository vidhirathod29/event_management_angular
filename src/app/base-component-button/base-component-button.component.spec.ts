import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseComponent} from './base-component-button.component';

describe('BaseComponentButtonComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
