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

  panier?: Panier
  prixTotal: number = 0

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    this.panier = JSON.parse(sessionStorage.getItem('panier') ?? JSON.stringify([]));
  }

  calculerPrixTotal(event: any) {
    this.prixTotal = Array.from(this.panier!!.produitsAchatMap.values()).reduce((accumulator, price) => {
      return accumulator + price;
    }, 0);
  }

  retirer(produit: Produit) {
    const indexProduitASupprimer = Array.from(this.panier!!.produitsAchatMap.keys()).findIndex((produit) => {
      return produit.id === produit.id;
    })
    Array.from(this.panier!!.produitsAchatMap.keys()).splice(indexProduitASupprimer, 1)
    sessionStorage.setItem('panier', JSON.stringify(this.panier))
  }

  valider(panier: Panier) {
    this.panierService.validerPanier(panier)
  }
}
