import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CurriculumComponent } from './curriculum.component'

describe('CurriculumComponent', () => {
  let component: CurriculumComponent
  let fixture: ComponentFixture<CurriculumComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CurriculumComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
