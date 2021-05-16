import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
    private modalService: ModalImagenService) { }
  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.actualizar();
    this.imgSubs = this.modalService.nuevaImagen.pipe(delay(100))
        .subscribe(img => this.actualizar());
  }
  actualizar() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
      .subscribe(({ total, usuarios }) => {
        this.totalUsuarios = total;
        if (usuarios.length !== 0) {
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        }
      });
  }
  cambiarPagina( valor: number ) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.actualizar();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.buscar('usuarios', termino)
      .subscribe((resultados: Usuario[]) => {
        this.usuarios = resultados;
      });
  }
  
  eliminarUsuario(usuario: Usuario) {

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse a sí mismo', 'error');
    }
  
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `está a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario)
          .subscribe(resp => {

            this.actualizar();
            Swal.fire('Usuario borrado', `${usuario.nombre} fue eliminado correctamente`, 'success')
          });
        
      }
    })
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(resp => console.log(resp));
  }


  abrirModal(usuario: Usuario) {
    this.modalService.abrirModal('usuarios', usuario.uid, usuario.img);
  }
  }


