import { Injectable } from '@angular/core';
//Para las peticiones HTTP
import { HttpClient, HttpParams} from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //Inicializamos la variable para los GIFS
  public gifList: Gif[] = []


  //Array de busqueda
  private _tagHistory:string[] = [];

  //API DE GIFS
  private apiKey:string = 'WslFs3d9eToxAfutDI1gsOvX357qcNpR';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';


  constructor(private http: HttpClient){
    //Cuando se inicie el servicio se carga el localStorage
    this.loadLocalStorage()
    console.log('Gifs Service Ready')
  }



  //Getter del tag de bisqueda
  get tagHistory (){

    return [...this._tagHistory]
  }

  //Organizar las busquedas
  private organizeHistory(tag:string){
    //para poner las busquedas en minuscula en el Array
    tag = tag.toLocaleLowerCase();

    //Para eliminar los valores repetidos y ponerlos al principio
    if( this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag)
    }

    this._tagHistory.unshift(tag);

    //Para limitar la lista a 10 elementos
    this._tagHistory = this.tagHistory.splice(0,10)

    this.savelocalStorage()
  }

  //Poner busqueda en el Array
   searchTag (tag:string):void{

    //Validación que no permite enviar campos vacios
    if (tag.length === 0) {
      return;
    }

    this.organizeHistory(tag);
    //console.log(this.tagHistory)

    //organizar la URL
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q',tag)

    //Mandar la peticion http a la API de GIFS
    this.http.get<SearchResponse>(`${this.serviceUrl }/search`, {params} )
      .subscribe( resp =>{

        this.gifList = resp.data;
        console.log({gifs:this.gifList})

      } )
  }

  //Guardar la información en el localStorage
  private savelocalStorage():void{
    localStorage.setItem('history' , JSON.stringify(this._tagHistory))
  }

  //Cargar la información del localStorage
  private loadLocalStorage():void{
    if(!localStorage.getItem('history')){
      return;
    }
    this._tagHistory = JSON.parse(localStorage.getItem('history')!)


    this.searchTag(this._tagHistory[0])

  }
}
