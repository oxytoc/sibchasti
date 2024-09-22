import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzePartsComponent } from './analyze-parts.component';

describe('AnalyzePartsComponent', () => {
  let component: AnalyzePartsComponent;
  let fixture: ComponentFixture<AnalyzePartsComponent>;

  // Перед запуском теста
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzePartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalyzePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Проверяем что должно быть, в этом случае создается ли компонент
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
