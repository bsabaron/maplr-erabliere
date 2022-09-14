import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produit } from '../modeles/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>('/api/produits')
  }

  getProduit(id: string): Observable<Produit> {
    return this.http.get<Produit>('/api/produits/' + id)
  }

}
