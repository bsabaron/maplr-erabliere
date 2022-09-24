import { NotificationService } from '../../services/notification.service';
import { ProduitService } from '../../services/produit.service';
import { PanierService } from '../../services/panier.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { DetailProduitComponent } from './detail-produit.component';
import { TypeSirop } from '../../enum/type-sirop';
import { Produit } from '../../modeles/produit';
import { of } from 'rxjs';

describe('DetailProduitComponent', () => {
  let component: DetailProduitComponent;
  let fixture: ComponentFixture<DetailProduitComponent>;

  const produitServiceSpy = jasmine.createSpyObj('ProduitService', ['getProduit']);
  const panierServiceSpy = jasmine.createSpyObj('PanierService', ['updateNbProduitPanier']);
  const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['notifier']);

  const produit: Produit = {
    id: 'id1',
    name: 'sirop1',
    description: 'description1',
    image: 'img1',
    price: 5,
    stock: 10,
    type: TypeSirop.CLAIR,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailProduitComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {
            snapshot: { params: { id: 'id1' } },
          }
        },
        { provide: ProduitService, useValue: produitServiceSpy },
        { provide: PanierService, useValue: panierServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy }
      ],
    }).compileComponents();

    produitServiceSpy.getProduit.and.returnValue(of(produit));
    sessionStorage.clear()

    fixture = TestBed.createComponent(DetailProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit calculer stock', () => {
    component.produit = produit
    expect(component.calculerStock()).toBe(produit.stock)
  });

  it('doit calculer stock avec produit présent dans le panier', () => {
    sessionStorage.setItem('panier', JSON.stringify(Array.from(new Map([[produit, 4]]))));
    expect(component.calculerStock()).toBe(produit.stock - 4)
  });

  it('doit ajouter au panier', () => {
    component.ajouterPanier(produit, 2)

    let panier: Map<Produit, number> = new Map(
      JSON.parse(sessionStorage.getItem('panier')!)
    );

    expect(Array.from(panier.entries()).length).toBe(1)
    expect(panier.entries().next().value[0]).toEqual(produit)
    expect(panier.entries().next().value[1]).toEqual(2)

    expect(component.stock).toBe(produit.stock - 2)
    expect(panierServiceSpy.updateNbProduitPanier).toHaveBeenCalled
    expect(notificationServiceSpy.notifier).toHaveBeenCalled
  });

  it('doit ajouter au panier avec produit déja présent', () => {
    sessionStorage.setItem('panier', JSON.stringify(Array.from(new Map([[produit, 4]]))));

    component.ajouterPanier(produit, 2)

    let panier: Map<Produit, number> = new Map(
      JSON.parse(sessionStorage.getItem('panier')!)
    );

    expect(Array.from(panier.entries()).length).toBe(1)
    expect(panier.entries().next().value[0]).toEqual(produit)
    expect(panier.entries().next().value[1]).toEqual(6)
  });
});
