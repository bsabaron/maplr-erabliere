import { DetailProduitComponent } from '../detail-produit/detail-produit.component';
import { By } from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TypeSirop } from '../../enum/type-sirop';
import { FiltreProduitComponent } from '../filtre-produit/filtre-produit.component';
import { Produit } from '../../modeles/produit';
import { FiltrerProduitPipe } from '../../pipes/filtrer-produit.pipe';
import { ProduitService } from '../../services/produit.service';

import { CatalogueComponent } from './catalogue.component';
import { Router } from '@angular/router';

registerLocaleData(localeFr, 'fr');

describe('CatalogueComponent', () => {
  let component: CatalogueComponent;
  let fixture: ComponentFixture<CatalogueComponent>;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const produitServiceSpy = jasmine.createSpyObj('ProduitService', ['getProduits']);

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
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'produit/:id', component: DetailProduitComponent },
        ]),
      ],
      declarations: [
        CatalogueComponent,
        FiltreProduitComponent,
        FiltrerProduitPipe,
      ],
      providers: [
        { provide: ProduitService, useValue: produitServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    produitServiceSpy.getProduits.and.returnValue(of(produits));

    fixture = TestBed.createComponent(CatalogueComponent);
    component = fixture.componentInstance;

    component.produits = produits;
    fixture.detectChanges();
  });

  it('doit filtrer produits', () => {
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(3);

    // simulation du filtre
    let child = fixture.debugElement.query(
      By.directive(FiltreProduitComponent)
    );
    child.componentInstance.typeSiropSlected = [
      TypeSirop.CLAIR,
      TypeSirop.AMBRE,
    ];
    fixture.detectChanges();

    let tableRowsFiltered = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRowsFiltered.length).toBe(2);
  });

  it('doit rediriger vers le detail du produit', () => {
    component.voirDetail(produits[0]);
    const navArgs = routerSpy.navigate.calls.first().args[0];
    expect(navArgs).toEqual(['/produit/', 'id1']);
  });
});
