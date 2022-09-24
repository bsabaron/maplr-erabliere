import { FiltrerProduitPipe } from './pipes/filtrer-produit.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { CatalogueComponent } from './composants/catalogue/catalogue.component';
import { MenuComponent } from './composants/menu/menu.component';
import { PanierComponent } from './composants/panier/panier.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DetailProduitComponent } from './composants/detail-produit/detail-produit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltreProduitComponent } from './composants/filtre-produit/filtre-produit.component';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    MenuComponent,
    PanierComponent,
    DetailProduitComponent,
    FiltrerProduitPipe,
    FiltreProduitComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
