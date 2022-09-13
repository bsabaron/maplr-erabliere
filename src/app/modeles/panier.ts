import { Produit } from "./produit";

export interface Panier {
    produitsAchatMap: Map<Produit, number>
}
