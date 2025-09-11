import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesFilterBarComponent } from './articles-filter-bar.component';

describe('ArticlesFilterBarComponent', () => {
  let component: ArticlesFilterBarComponent;
  let fixture: ComponentFixture<ArticlesFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlesFilterBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
