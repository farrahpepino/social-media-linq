import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWeb } from './navbar-web';

describe('NavbarWeb', () => {
  let component: NavbarWeb;
  let fixture: ComponentFixture<NavbarWeb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarWeb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarWeb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
