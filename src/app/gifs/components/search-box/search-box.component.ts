import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../service/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template:`
  <h5>Buscar:
    <input type="text"
    class="form-control"
    placeholder="Buscar Gifs"
    #txtTagInput
    (keyup.enter)="searchTag()"
    >

  </h5>
  `
})
export class SearchBoxComponent {

  //Tomar valores de inputs
  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;


  constructor(private GifsService:GifsService ){

  }
  searchTag(){

    const newTag = this.tagInput.nativeElement.value
    this.GifsService.searchTag(newTag);

    this.tagInput.nativeElement.value= ''

  }
}
