import { catchError, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Produit } from '../modeles/produit';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>('/api/produits')
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.notificationService.notifierErreur(error.error)
          return throwError(() => error);
        })
      )
  }

  getProduit(id: string): Observable<Produit> {
    return this.http.get<Produit>('/api/produits/' + id)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.notifierErreur(error.error)
        return throwError(() => error);
      })
    )
  }

}