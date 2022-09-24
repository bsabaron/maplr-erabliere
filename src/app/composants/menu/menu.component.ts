import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nbProduitPanier: number = 0
  destroy$: Subject<boolean> = new Subject()

  constructor(private panierService: PanierService) { }

  ngOnInit(): void {
    this.panierService.nbProduitPanierSource.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.nbProduitPanier = data;
    })
    this.panierService.initialiserNbProduitPanier()
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

}
