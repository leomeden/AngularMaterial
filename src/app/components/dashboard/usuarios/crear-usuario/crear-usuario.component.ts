import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  sexo: any[] = ['Masculino','Femenino'];

  form:FormGroup;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      usuario:['', Validators.required],
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      sexo:['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  agregarUsuario() {
    console.log(this.form);
  }

}
