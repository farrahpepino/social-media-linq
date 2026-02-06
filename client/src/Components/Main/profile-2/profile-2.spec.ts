import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profile2 } from './profile-2';

describe('Profile2', () => {
  let component: Profile2;
  let fixture: ComponentFixture<Profile2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Profile2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
