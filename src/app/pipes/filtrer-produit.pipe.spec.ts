import { TypeSirop } from '../enum/type-sirop';
import { Produit } from '../modeles/produit';
import { FiltrerProduitPipe } from './filtrer-produit.pipe';

describe('FiltrerProduitPipe', () => {

  let produits: Produit[] = [
    {
      id: 'id1',
      name: 'sirop1',
      description: 'description1',
      image: 'img1',
      price: 5,
      stock: 10,
      type: TypeSirop.CLAIR,
    },
    {
      id: 'id2',
      name: 'sirop2',
      description: 'description2',
      image: 'img2',
      price: 10,
      stock: 5,
      type: TypeSirop.AMBRE,
    },
    {
      id: 'id3',
      name: 'sirop3',
      description: 'description3',
      image: 'img3',
      price: 50,
      stock: 100,
      type: TypeSirop.NOIR,
    },
  ];

  it('doit filtrer produits en fonction du type de sirop', () => {
    const pipe = new FiltrerProduitPipe();

    let produitsFiltered = pipe.transform(produits, [TypeSirop.CLAIR, TypeSirop.AMBRE])

    expect(produitsFiltered.length).toBe(2)
    expect(produitsFiltered).toContain(produits[0])
    expect(produitsFiltered).toContain(produits[1])
  });
});
