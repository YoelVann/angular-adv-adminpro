import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
  // menu: any[] = [
  //   {
  //     titulo: 'Dashboard',
  //     icono: ' mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main', url: '/'},
  //       { titulo: 'ProgressBar', url: 'progress'},
  //       { titulo: 'Gráficas', url: 'grafica1'},
  //       { titulo: 'Rxjs', url: 'rxjs'},
  //       { titulo: 'Promesas', url: 'promesas'},
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: ' mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios'},
  //       { titulo: 'Médicos', url: 'medicos'},
  //       { titulo: 'Hospitales', url: 'hospitales'},
  //     ]
  //   }
  // ];
  constructor() { }
}
