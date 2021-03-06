import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { PerfilComponent } from './perfil/perfil.component';
// mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Accoun-Settings' } },
  { path: 'buscar/:termino', component: BusquedasComponent, data:{titulo:'Búsqueda global'}  },
  { path: 'grafica1', component: Grafica1Component, data:{titulo:'Gráfica #1'}  },
  { path: 'perfil', component: PerfilComponent, data:{titulo:'Perfil de usuario'}  },
  { path: 'progress', component: ProgressComponent, data:{titulo:'ProgressBar'}  },
  { path: 'promesas', component: PromesasComponent, data:{titulo:'Promesas'}  },
  { path: 'rxjs', component: RxjsComponent, data:{titulo:'Rxjs'}  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  //MANTENIMIENTOS
  { path: 'hospitales', component: HospitalesComponent, data:{titulo:'Mantenimiento de Hospitales'}  },
  { path: 'medicos', component: MedicosComponent, data:{titulo:'Mantenimiento de Médicos'}  },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de Médicos' } },
  // rutas de admin
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data:{titulo:'Mantenimiento de Usuarios'}  },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
