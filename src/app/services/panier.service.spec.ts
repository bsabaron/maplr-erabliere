import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TypeSirop } from '../enum/type-sirop';
import { Produit } from '../modeles/produit';
import { ValidationProduitDto } from '../modeles/validation-produit';
import { NotificationService } from './notification.service';

import { PanierService } from './panier.service';

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

describe('PanierService', () => {
  let service: PanierService;

  let httpTestingController: HttpTestingController;
  const notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
    'notifier',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NotificationService, useValue: notificationServiceSpy }
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PanierService);
  });

  it('doit valider le panier', () => {
    service
      .validerPanier(
        new Map([
          [produits[0], 2],
          [produits[1], 1],
        ])
      )
      .subscribe();

    const req = httpTestingController.expectOne('api/commander');

    expect(req.request.body).toEqual(
      [
        {
          productId: produits[0].id,
          qty: 2,
        },
        {
          productId: produits[1].id,
          qty: 1,
        },
      ] as ValidationProduitDto[])

    expect(notificationServiceSpy.notifier).toHaveBeenCalled
    expect(service.viderPanier).toHaveBeenCalled
  });

  it('doit update nombre produits panier lors d\'un ajout', () => {
    service.nbProduitPanier = 2
    service.nbProduitPanierSource.subscribe((data) => {
      expect(data).toBe(6);
    });

    service.updateNbProduitPanier(4);
  });

  it('doit update nombre produits panier lors d\'un retrait', () => {
    service.nbProduitPanier = 6
    service.nbProduitPanierSource.subscribe((data) => {
      expect(data).toBe(2);
    });

    service.updateNbProduitPanier(4, false);
  });

  it('initialiser nombre produits panier', () => {
    sessionStorage.clear()
    service.nbProduitPanierSource.subscribe((data) => {
      expect(data).toBe(6);
    });

    sessionStorage.setItem('panier', JSON.stringify(Array.from(new Map([[produits[0], 4], [produits[1], 2]]))));
    service.initialiserNbProduitPanier();
  });

  it('doit vider panier', () => {
    sessionStorage.setItem('panier', JSON.stringify(Array.from(new Map([[produits[0], 4], [produits[1], 2]]))));
    
    service.viderPanier()

    service.nbProduitPanierSource.subscribe((data) => {
      expect(data).toBe(0);
    });
    expect(sessionStorage.length).toBe(0)
  });
});
