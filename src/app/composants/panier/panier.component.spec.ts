import { registerLocaleData } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TypeSirop } from '../../enum/type-sirop';
import { Produit } from '../../modeles/produit';
import { PanierService } from '../../services/panier.service';

import { PanierComponent } from './panier.component';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const panierServiceSpy = jasmine.createSpyObj('PanierService', [
    'updateNbProduitPanier', 'validerPanier'
  ]);

  let produits: Produit[] = [
    {
      id: 'id1',
      name: 'sirop1',
      description: 'description1',
      image: 'img1',
      price: 5,
      stock: 10,
      type: TypeSirop.CLAIR,
    },
    {
      id: 'id2',
      name: 'sirop2',
      description: 'description2',
      image: 'img2',
      price: 10,
      stock: 5,
      type: TypeSirop.AMBRE,
    },
    {
      id: 'id3',
      name: 'sirop3',
      description: 'description3',
      image: 'img3',
      price: 50,
      stock: 100,
      type: TypeSirop.NOIR,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PanierComponent],
      providers: [
        { provide: PanierService, useValue: panierServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    sessionStorage.clear();

    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit calculer le prix total', () => {
    component.panier.set(produits[0], 1);
    component.panier.set(produits[1], 2);

    component.calculerPrixTotal();

    expect(component.prixTotal).toBe(25);
  });

  it('doit verifier un panier vide', () => {
    expect(component.panier.entries.length).toBe(0);

    expect(component.isPanierVide).toBeTrue;

    expect(component.prixTotal).toBeNull;

    const boutonValider = fixture.nativeElement.querySelector('button');
    expect(boutonValider.disabled).toBeTrue;
  });

  it('doit retirer un produit', () => {
    component.panier.set(produits[0], 1);
    component.panier.set(produits[1], 2);

    component.retirer(produits[1], 2);

    expect(Array.from(component.panier.keys())).toEqual([produits[0]])
    expect(component.prixTotal).toBe(5);
    expect(panierServiceSpy.updateNbProduitPanier).toHaveBeenCalled
  });

  it('doit rediriger vers le detail du produit', () => {
    component.voirDetail(produits[0]);
    const navArgs = routerSpy.navigate.calls.first().args[0];
    expect(navArgs).toEqual(['/produit/', 'id1']);
  });

  it('doit valider panier', () => {
    panierServiceSpy.validerPanier.and.returnValue(of('OK'));

    component.validerPanier();

    panierServiceSpy.validerPanier().subscribe(() => {
      expect(component.panier.size).toBe(0);
      expect(component.calculerPrixTotal).toHaveBeenCalled;
      expect(component.isPanierVide).toBeTrue;
    });
  });
});
