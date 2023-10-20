import { Component } from '@angular/core';
import { NbStatusService } from '@nebular/theme';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent {
  public mejorPuntaje = 0;
  public fichas:any = [];
  public estadoJuego = 0;
  public puntajeExtra = 0;
  public finalizados = 0;
  public count = 3;
  public counter:any;
  public timerClass = 0;
  public selecciones:any = [];
  public verificando = false;
  public puntaje = 0;
  public movimientos = 0;
  public reloj:any;
  public segundos = 59;
  public minutos = 1;
  shuffle(array: string[]){ 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 
  randomArray:any = ()=>{

    const array: number[] = Array(6) // array size is 10
    .fill(undefined)
    .map(() => {
      return Math.floor(22 * Math.random()) + 1
    });
    let flag = true;
    array.forEach((el:any)=>{
      if(array.filter(i=>i==el).length > 1){
        flag = false;
      }
    })
    if(!flag)
      return this.randomArray()
    else
      return array;
  }
  constructor(){
    var img=new Image();
    const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    numeros.forEach((i:any)=>{
      img.src = `../../assets/img/img${i}.png`;
      img.src = `../../assets/img/img${i}-r.png`;
    })
    //this.iniciar();

  }
  cambiarEstado(estado:any){
    this.estadoJuego = estado
  }
  iniciarJuego(){
    this.finalizados = 0;
    this.segundos = 59;
    this.minutos = 1;
    this.cambiarEstado(1);
    this.count = 3;
    this.counter = this.countT();
  }
  countT(){
    setTimeout(()=>{
      this.timerClass = 1;
    }, 10)
    return setInterval(()=>{
      setTimeout(()=>{
        this.timerClass = 1;
      }, 10)
      this.timerClass = 0
      this.count--;
      if(this.count == 0){
        this.timerClass = 1;
        this.cambiarEstado(2)
        this.iniciar();
        clearInterval(this.counter)
      }
    }, 1000)
  }

  iniciar(){
    this.fichas = [];
    this.puntaje = 0;
    this.movimientos = 0;
    this.puntajeExtra = 120;
    let fichasBuff:any = [];
    const numeros = this.randomArray();
    numeros.forEach((i:any)=>{
      fichasBuff.push({id:`${i}`, pareja:`${i}r`, imagen:`../../assets/img/img${i}.png`})
      fichasBuff.push({id:`${i}r`, pareja:`${i}`, imagen:`../../assets/img/img${i}-r.png`})
    })

    this.fichas = this.shuffle(fichasBuff)
    this.reloj = this.cronometro();
  }
  cronometro(){
    return setInterval(()=>{
      this.puntajeExtra--;
      this.segundos--;
      if(this.segundos == -1){
        this.segundos = 59
        this.minutos--;
        if(this.minutos == -1){
          this.minutos = 0;
          this.segundos = 0;
          this.finalizar()
          
        }
      }
      
    },1000)
  }
  finalizarFront(){
    this.puntajeExtra = 0;
    this.finalizar();
  }
  seleccionar(f:any, e:any){
    
    if(this.selecciones.length < 2){
      if(this.selecciones![0] != f){
        this.movimientos++;

        e.classList.add("flip")
        f["html"]=e;
        this.selecciones.push(f)
      }

    }
    if(this.selecciones.length == 2 && !this.verificando){
      this.verificando = true;
      this.verificar()
    }
  }
  finalizar(){
    clearInterval(this.reloj);
    this.estadoJuego = 3;
    if(this.puntaje > this.mejorPuntaje){
      this.mejorPuntaje=this.puntaje;
    }
  }
  verificar(){
    if(this.selecciones[0].id == this.selecciones[1].pareja){

      this.verificando = false;
      this.selecciones[0].html.classList.add("check")
      this.selecciones[1].html.classList.add("check")
      this.selecciones = [];
      this.puntaje++;
      this.finalizados++;
      if(this.finalizados == 6){
        setTimeout(()=>{
          if(this.puntajeExtra > 0){
            this.puntaje = this.puntaje + this.puntajeExtra;
          }
          this.finalizar();
        }, 2000)
      }
    }else{
      setTimeout(()=>{
        this.verificando = false;
        this.selecciones[0].html.classList.remove("flip")
        this.selecciones[1].html.classList.remove("flip")
        this.selecciones = [];
      },3500)
    }
  }
}
