import { Panier } from './../modeles/panier';
import { PanierService } from './../services/panier.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../modeles/produit';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  panier: Map<Produit, number> = new Map
  prixTotal: number = 0

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    this.panier = new Map(JSON.parse(sessionStorage.getItem('panier')!))
  }

  calculerPrixTotal(event: any) {
    this.prixTotal = Array.from(this.panier.keys()).reduce((accumulator, produit) => {
      return accumulator + produit.price;
    }, 0);
  }

  retirer(produit: Produit) {
    const indexProduitASupprimer = Array.from(this.panier.keys()).findIndex((produit) => {
      return produit.id === produit.id;
    })
    Array.from(this.panier.keys()).splice(indexProduitASupprimer, 1)
    sessionStorage.setItem('panier', JSON.stringify(this.panier))
  }

  validerPanier() {
    this.panierService.validerPanier(this.panier)
  }
}
