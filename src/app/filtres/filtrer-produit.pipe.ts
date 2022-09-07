import { Pipe, PipeTransform } from '@angular/core';
import { Produit } from '../modeles/produit';

@Pipe({
  name: 'filtrerProduit'
})
export class FiltrerProduitPipe implements PipeTransform {

  transform(produitsAFiltrer: Produit[], types: string[]): Produit[] {
    if (types.length > 0) {
      return produitsAFiltrer.filter(p => types.includes(p.type));
    } else {
      return produitsAFiltrer
    }
  }

}
