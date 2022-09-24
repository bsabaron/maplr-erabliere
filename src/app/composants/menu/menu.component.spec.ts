import { Subject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanierService } from '../../services/panier.service';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  const panierServiceSpy = jasmine.createSpyObj(
    'PanierService',
    ['initialiserNbProduitPanier'],
    { nbProduitPanierSource: new Subject<number>()}
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [{ provide: PanierService, useValue: panierServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit initialiser le menu à partir des infos récupérées du panier', () => {
    panierServiceSpy.nbProduitPanierSource.next(5)
    expect(component.nbProduitPanier).toBe(5)
    expect(panierServiceSpy.initialiserNbProduitPanier).toHaveBeenCalled
    expect(component).toBeTruthy();
  });
});
