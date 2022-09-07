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

  typeSiropSlected: string[]  = []
  typeSiropList: string[] = ['CLEAR', 'AMBER', 'DARK'];

  constructor(private produitService: ProduitService, private router: Router) { }

  ngOnInit(): void {
    this.produitService.getProduits()
      .subscribe(produits => this.produits = produits);
  }

  voirDetail(produit: Produit) {
    let route = '/produit/' + produit.id;
    this.router.navigate([route]);
  }

}
