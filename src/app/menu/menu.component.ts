import { Component, OnInit } from '@angular/core';
import { Produit } from '../modeles/produit';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nbProduitAchat: number = 0
  panier: Map<Produit, number>

  constructor() {
    this.panier = new Map(JSON.parse(sessionStorage.getItem('panier')!))
    this.nbProduitAchat = Array.from(this.panier.values()).reduce((accumulator, quantite) => {
      return accumulator + quantite;
    }, 0);
   }

  ngOnInit(): void {
    
  }

}
