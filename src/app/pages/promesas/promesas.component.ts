import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
    });
  }

  ngOnInit(): void {
 

    //     const promesa = new Promise((resolve, reject) => {
    //       if (false) {
    //         resolve('Hola desde promesa');
    //       } else {
    //         reject('UPS! algo salió mal');
    //       }
    //    });
  
    //   promesa.then((mensaje) => {
    //     console.log(mensaje);
    // }).catch(error => console.log('Error en la promesa né', error));

    // console.log('Hola');

  }
  getUsuarios() {

    return new Promise(resolve => {
      fetch('https://reqres.in/api/users?page=2')
        .then( resp =>  resp.json() )
        .then (body => resolve(body.data));
        
  });

  

  }
}