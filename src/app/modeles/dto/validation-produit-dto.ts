export class ValidationProduitDto {
    productId: string
    qty: number

    constructor(idProduit: string, quantite: number) {
        this.productId = idProduit;
        this.qty = quantite;
    }
}
