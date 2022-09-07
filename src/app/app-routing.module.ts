import { PanierComponent } from './panier/panier.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/catalogue', pathMatch: 'full' },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'produit/:id', component: DetailProduitComponent },
  { path: 'panier', component: PanierComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
