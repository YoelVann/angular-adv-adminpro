import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';

import { LoginForm } from '../interfaces/login-form-interfaces';
import { RegisterForm } from '../interfaces/register-form-interface';

import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import Swal from 'sweetalert2';




declare const gapi: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
  
export class UsuarioService {
  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {
    
    this.googleInit();
    }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get uid() {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
      'x-token': this.token
      }
    }
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
  return this.usuario.role;
  }
  
  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }
  googleInit() {

    return new Promise<void>( resolve => {
      
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '302568893187-4t00nu5td9n8fkir9t18jh5vdl70kuo5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    
    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        
        this.router.navigateByUrl('/login');
      });
    });
  }

  validarToken():Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {

        const { email, google, nombre, role, img = '', uid } = resp.usuario;

        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
        
        this.guardarLocalStorage(resp.token, resp.menu);

        return true;
      }),
      catchError( error => of(false) )
    )
  }

  crearUsuario(formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap(
        (resp:any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        }
      )
    );
  }


  actualizarPerfil(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.usuario.role
    };
    
    return this.http.put(`${base_url}/usuarios/${ this.uid }`, data, this.headers);
  }


  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap(
          (resp:any) => {
            this.guardarLocalStorage(resp.token, resp.menu);
          }
        )
      );
        
  }

  loginGoogle(token) {

    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap(
          (resp:any) => {
            this.guardarLocalStorage(resp.token, resp.menu);
          }
        )
      );
        
  }

  cargarUsuarios(desde: number = 0) {
    
    const url = `${base_url}/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(
          resp => {
            const usuarios = resp.usuarios.map(
              user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid));
            return {
              total: resp.total,
              usuarios
            };
          }
        )
      )

  }

  eliminarUsuario(usuario: Usuario) {
    
    const url = `${base_url}/usuarios/${ usuario.uid }`;
    return this.http.delete<CargarUsuario>(url, this.headers);
  }

  guardarUsuario(usuario: Usuario) {      
      return this.http.put(`${base_url}/usuarios/${ usuario.uid }`, usuario, this.headers);
  }
}
