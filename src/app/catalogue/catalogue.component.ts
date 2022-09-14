import { TypeSirop } from './../enum/type-sirop';
import { ProduitService } from '../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../modeles/produit';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  produits: Produit[] = [];

  typeSiropSlected: string[] = []
  typeSiropList = TypeSirop

  constructor(private produitService: ProduitService, private router: Router) { }

  ngOnInit(): void {
    this.produitService.getProduits()
      .subscribe(produits => this.produits = produits);
  }

  voirDetail(produit: Produit) {
    let route = '/produit/' + produit.id;
    this.router.navigate([route]);
  }

  ajouterPanier(produit: Produit) {
    let panier: Map<Produit, number> = new Map(JSON.parse(sessionStorage.getItem('panier')!))
    panier.set(produit, panier.get(produit) ?? 0 + 1)
    sessionStorage.setItem('panier', JSON.stringify(Array.from(panier.entries())))
  }

}
