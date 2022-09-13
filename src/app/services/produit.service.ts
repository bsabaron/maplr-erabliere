import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Produit } from '../modeles/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    // return this.http.get<Produit[]>('https://us-central1-maple-grove-349221.cloudfunctions.net/maplr-sugar-bush/products', this.httpOptions)
    return this.http.get<Produit[]>('https://us-central1-maple-grove-349221.cloudfunctions.net/maplr-sugar-bush/products')
  }

  getProduit(id: string): Observable<Produit> {
    return this.http.get<Produit>('https://us-central1-maple-grove-349221.cloudfunctions.net/maplr-sugar-bush/products/' + id)
  }

}
