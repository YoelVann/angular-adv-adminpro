import { Component } from '@angular/core';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  title1 = 'Ventas'
  public labels1 = ['Chescos', 'Tacos', 'Chelas'];
  public data1 = [
    [10, 20, 30]
  ];
}
