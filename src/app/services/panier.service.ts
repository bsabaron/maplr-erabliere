import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { Produit } from '../modeles/produit';
import { ValidationProduitDto } from '../modeles/validation-produit';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  public nbProduitPanier: number = 0;

  nbProduitPanierSource = new Subject<number>();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  initialiserNbProduitPanier() {
    let panier: Map<Produit, number> = new Map(
      JSON.parse(sessionStorage.getItem('panier')!)
    );
    this.nbProduitPanier = Array.from(panier.values()).reduce(
      (accumulator, quantite) => {
        return accumulator + quantite;
      },
      0
    );
    this.nbProduitPanierSource.next(this.nbProduitPanier);
  }

  validerPanier(panier: Map<Produit, number>): Observable<any> {
    let validationProduitList: ValidationProduitDto[] = [];

    panier.forEach((quantite: number, produit: Produit) => {
      validationProduitList.push({
        productId: produit.id,
        qty: quantite,
      } as ValidationProduitDto);
    });

    return this.http
      .post<ValidationProduitDto[]>('api/commander', validationProduitList)
      .pipe(
        tap(() => {
          this.notificationService.notifier('Commande validée');
          this.viderPanier()
        }),
        catchError((error: HttpErrorResponse) => {
          this.notificationService.notifierErreur(error.error);
          return throwError(() => error);
        })
      );
  }

  updateNbProduitPanier(quantite: number, isAjout: boolean = true) {
    if (isAjout) {
      this.nbProduitPanier += quantite;
    } else {
      this.nbProduitPanier -= quantite;
    }
    this.nbProduitPanierSource.next(this.nbProduitPanier);
  }

  viderPanier(){
    this.nbProduitPanierSource.next(0);
    sessionStorage.clear()
  }
}
