import { Component, OnInit } from '@angular/core';
import { TypeSirop } from '../../enum/type-sirop';

@Component({
  selector: 'filtre-produit',
  templateUrl: './filtre-produit.component.html',
  styleUrls: ['./filtre-produit.component.css']
})
export class FiltreProduitComponent implements OnInit {

  typeSiropSlected: string[] = []
  typeSiropList = TypeSirop

  constructor() { }

  ngOnInit(): void {
  }

}
