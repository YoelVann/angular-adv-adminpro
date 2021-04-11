import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css'
  ]
})
export class ProgressComponent implements OnInit {

  progreso1 = 20;
  progreso2 = 90;

  get getProgreso1() {
    return `${this.progreso1}%`
  }
  get getProgreso2() {
    return `${this.progreso2}%`
  }

  cambioValorHijo(valor: number) {
    console.log('si', valor);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
