import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;
  constructor() {
  

    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('subs', valor),
    //   error => console.warn('Error', error),
    //   () => console.info('Obs Terminado')
    // );
   this.intervalSubs = this.retornaIntervalo().subscribe( console.log )
  }


  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  }
  retornaIntervalo(): Observable<number> {
    return interval(100).
      pipe(
        // take(20),
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0)? true: false),
      );
  }
  retornaObservable(): Observable<number> {
      
    let i = 0;

    return new Observable<number>(observer => {

      const cont = setInterval(() => {
       
        i += 1;
       observer.next(i);
       
        if (i===4) {
          clearInterval(cont);
          observer.complete();
        }
       
        if (i === 2) {
          observer.error('Llegué a  2');
        }
      }, 1000)
    });
  }
}
