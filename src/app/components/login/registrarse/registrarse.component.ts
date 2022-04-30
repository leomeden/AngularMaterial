import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  form: FormGroup;

  constructor (private fb: FormBuilder, 
               private _snackBar: MatSnackBar, 
               private router: Router,
               private _authService: AuthService){
    
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      mail: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  registrarse() {
    console.log("formulario registro: ",this.form);

    const mail = this.form.value.mail;
    const password = this.form.value.password;

    this._authService.SignUp(mail, password)
  }

}
