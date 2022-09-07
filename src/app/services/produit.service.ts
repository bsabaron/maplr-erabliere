import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produit } from '../modeles/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>('https://us-central1-maple-grove-349221.cloudfunctions.net/maplr-sugar-bush/products')
  }

  getProduit(id: string): Observable<Produit> {
    return this.http.get<Produit>('https://us-central1-maple-grove-349221.cloudfunctions.net/maplr-sugar-bush/products/' + id)
  }

}
