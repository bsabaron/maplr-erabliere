import { ProduitService } from '../services/produit.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from '../modeles/produit';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

  produit: Produit | undefined

  constructor(private route: ActivatedRoute, private catalogueService: ProduitService) { }

  ngOnInit(): void {
    let produitId = this.route.snapshot.paramMap.get('id') as string
    this.catalogueService.getProduit(produitId)
      .subscribe(produit => this.produit = produit);
  }

}
