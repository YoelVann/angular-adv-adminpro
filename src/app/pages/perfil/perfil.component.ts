import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) {
    
    this.usuario = this.usuarioService.usuario;
    }
  
  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
   
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Los cambios se han guardado', 'success');
      }, (err) => {
        
        Swal.fire('No se pudo guardar...', err.error.msg, 'error');
        console.log();
      });
  }

  cambiarImagen( file: File ) {
    this.imagenSubir = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService.actulizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen actualizada', 'success');
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', 'Imagen no se pudo guardad', 'error');
      });
  }
}
