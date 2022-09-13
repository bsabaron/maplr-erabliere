import { Panier } from './../modeles/panier';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../modeles/produit';
import { ValidationProduitDto } from '../modeles/dto/validation-produit-dto';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  validerPanier(panier: Panier): Observable<any> {
    let validationPanier: ValidationProduitDto[] = []
    panier.produitsAchatMap.forEach((quantite: number, produit: Produit) => {
      validationPanier.push(new ValidationProduitDto(produit.id, quantite))
    });
    return this.http.post('https://us-central1-maple-grove-349221.cloudfunctions.net/maplr-sugar-bush/order', JSON.stringify(validationPanier))
  }

}