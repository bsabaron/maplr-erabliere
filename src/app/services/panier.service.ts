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

  constructor(private http: HttpClient) { }

  validerPanier(panier: Map<Produit, number>): Observable<any> {
    let validationPanier: ValidationProduitDto[] = []
    panier.forEach((quantite: number, produit: Produit) => {
      validationPanier.push(new ValidationProduitDto(produit.id, quantite))
    });
    return this.http.post('api/commander', JSON.stringify(validationPanier))
  }

}