import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor (private fb: FormBuilder, private _snackBar: MatSnackBar){
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar(){
    console.log(this.form);
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if(usuario == 'lmeden' && password == 'admin123') {
      //redireccionamos al dashboard
      this.fakeLoading();
    } else {
      //mostramos un mensaje de error
      this.error();
      this.form.reset();
    }
  }

    error(){
      this._snackBar.open('Usuario o Contraseña ingresado son invalidos', '', {
        duration: 5000,
        horizontalPosition:'center',
        verticalPosition: 'bottom'
        
      })
    }

    fakeLoading(){
      this.loading = true;
      setTimeout(() => {

        //Redireccionamos al dashboard
        this.loading = false;
      }, 1500)
    }

}
