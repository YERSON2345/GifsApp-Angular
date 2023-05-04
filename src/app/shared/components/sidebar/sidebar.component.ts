import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/service/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  //Importar un servicio
  //private gifsService
  constructor(private gifsService:GifsService){

  }

  //Agarrar todos los tagHistory del Array (Ya despues ir a sideBar.component y utilizar ngFor con tag of "tags" como esta en el get
  get tags():string []{
    return this.gifsService.tagHistory
  }

  public reSearchTags(tag:string){
    return this.gifsService.searchTag(tag)
  }
}
