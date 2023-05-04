import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent {

  @Input()
  public url!:string;

  @Input()
  public alt:string = ''



  public hasLoaded:boolean = false;


  noOnInit():void{
    if( !this.url ) throw new Error("URL properti us required")
  }

  onLoad(){
    setTimeout(()=>{
      this.hasLoaded = true;
    },1000 )

  }
}
