import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts'

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  @Input() title = 'Sin Título';

  @Output() dataSalida: EventEmitter<number[]> = new EventEmitter();
   // Doughnut
  @ Input('labels') doughnutChartLabels: Label[] =['label1', 'label2', 'label3'];
  @Input ('data')doughnutChartData: MultiDataSet = [
     [30,30,30]
   ];
 
  public colors: Color[] = [
    { backgroundColor: ['#C133FF', '#3374FF', '#33FF61'] }
  ];
}
