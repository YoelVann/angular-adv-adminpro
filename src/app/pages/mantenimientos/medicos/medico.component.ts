import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = []
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRote: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRote.params.subscribe(({ id }) => this.cargarMedico(id));
   
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges.subscribe(hospitalId => {
      
      this.hospitalSeleccionado = this.hospitales.find(hosp => hosp._id === hospitalId);

    })
  }

  cargarMedico(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.medicoService.obternerMedicoById(id)
      .pipe(
        delay(100)
      )
      .subscribe(medico => {

        if (!medico) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }

        const {nombre, hospital:{ _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      }, error => {
        return this.router.navigateByUrl(`/dashboard/medicos`);
      })
  }

  guardarMedico() {

    const { nombre } = this.medicoForm.value;
    
    if (this.medicoSeleccionado) {

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      
      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
        })

    } else {

      
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
  
          Swal.fire('Creado', `${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${ resp.medico._id}`);
        })
    }
   
  }


  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
    })
  }
}
