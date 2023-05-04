import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html'
})
export class GifsCardComponent implements OnInit{

  @Input()
  public gif!: Gif;

  //Validación para que el metodo no inicie si no viene el valor de "gifs" (Siempre intentar hacer estas validaciones)
  ngOnInit(): void {
    
    if(!this.gif) throw new Error('La propiedad "gif" es requerida.');
  }
}
