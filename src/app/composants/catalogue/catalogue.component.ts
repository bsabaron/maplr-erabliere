import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../../modeles/produit';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  produits: Produit[] = [];

  constructor(private produitService: ProduitService, private router: Router) { }

  ngOnInit(): void {
    this.produitService.getProduits()
      .subscribe(produits => this.produits = produits);
  }

  voirDetail(produit: Produit) {
    this.router.navigate(['/produit/', produit.id]);
  }

}
