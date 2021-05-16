import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
              private router: Router) {
    this.usuario = usuarioService.usuario;
  }

    logout(){
      this.usuarioService.logOut();
    }
   

  ngOnInit(): void {
  }

  buscar(entrada:string) {
    
    if (entrada.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${entrada}`);
  }
}
