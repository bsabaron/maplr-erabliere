import { Produit } from "./produit";

export class Panier {
    produitsAchatMap: Map<Produit, number> = new Map<Produit, number>()

    constructor() { }
}
