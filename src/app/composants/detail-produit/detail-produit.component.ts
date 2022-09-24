import { ProduitService } from '../../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from '../../modeles/produit';
import { PanierService } from '../../services/panier.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css'],
})
export class DetailProduitComponent implements OnInit {
  produit?: Produit;
  qtySelected: number = 1;
  stock: number = 0;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private panierService: PanierService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    let produitId = this.route.snapshot.params['id'];
    this.produitService
      .getProduit(produitId!)
      .subscribe((produit) => {
        this.produit = produit;
        this.stock = this.calculerStock()
      });
  }

  compteur(range: number): number[] {
    return Array.from({ length: range }, (_, i) => i + 1);
  }

  calculerStock(): number {
    let stock = this.produit!.stock;
    let panier: Map<Produit, number> = new Map(
      JSON.parse(sessionStorage.getItem('panier')!)
    );
    panier.forEach((quantite, produit) => {
      if (produit.id === this.produit?.id) {
        stock -= quantite;
      }
    });
    return stock;
  }

  ajouterPanier(produit: Produit, quantite: number) {
    let panier: Map<Produit, number> = new Map(
      JSON.parse(sessionStorage.getItem('panier')!)
    );

    // Update de la quantité d'un produit déja présent dans le panier
    let produitDejaPresent = Array.from(panier.entries()).find(
      ([p, qty]) => (produit.id === p.id)
    );

    if (produitDejaPresent) {
      panier.set(produitDejaPresent[0], produitDejaPresent[1] + quantite);
    } else {
      panier.set(produit, quantite);
    }

    sessionStorage.setItem('panier', JSON.stringify(Array.from(panier.entries())));
    this.stock -= quantite
    this.panierService.updateNbProduitPanier(quantite);
    this.notificationService.notifier('Ajouté au panier');
  }
}
