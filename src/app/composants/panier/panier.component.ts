import { PanierService } from '../../services/panier.service';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../../modeles/produit';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  panier: Map<Produit, number> = new Map
  prixTotal: number = 0
  isPanierVide: boolean = true

  constructor(private router: Router, private panierService: PanierService) { }

  ngOnInit(): void {
    let panierSession = sessionStorage.getItem('panier')
    if (panierSession) {
      this.panier = new Map(JSON.parse(sessionStorage.getItem('panier')!))
      this.calculerPrixTotal()
      this.isPanierVide = this.panier.size === 0
    }
  }

  voirDetail(produit: Produit) {
    this.router.navigate(['/produit/', produit.id]);
  }

  calculerPrixTotal(): void {
    this.prixTotal = 0
    this.panier.forEach((quantite, produit) => {
      this.prixTotal += produit.price * quantite;
    });
  }

  retirer(produit: Produit, quantite: number) {
    this.panier.delete(produit)
    sessionStorage.setItem('panier', JSON.stringify(Array.from(this.panier.entries())))
    this.panierService.updateNbProduitPanier(quantite, false)
    this.calculerPrixTotal()
    this.isPanierVide = this.panier.size === 0
  }

  validerPanier() {
    this.panierService.validerPanier(this.panier).subscribe()
  }

}
