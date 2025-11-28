import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMobile } from './navbar-mobile';

describe('NavbarMobile', () => {
  let component: NavbarMobile;
  let fixture: ComponentFixture<NavbarMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMobile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
