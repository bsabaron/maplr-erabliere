import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreProduitComponent } from './filtre-produit.component';

describe('FiltreProduitComponent', () => {
  let component: FiltreProduitComponent;
  let fixture: ComponentFixture<FiltreProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreProduitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltreProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
