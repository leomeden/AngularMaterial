import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor (private fb: FormBuilder, 
               private _snackBar: MatSnackBar, 
               private router: Router,
               private _authService: AuthService){
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

    /*if(usuario == 'lmeden' && password == 'admin123') {
      //redireccionamos al dashboard
      this.fakeLoading();
    } else {
      //mostramos un mensaje de error
      this.error();
      this.form.reset();
    }*/

    this._authService.SignIn(usuario, password)


  }

   /* error(){
      this._snackBar.open('Usuario o Contraseña ingresado son invalidos', '', {
        duration: 5000,
        horizontalPosition:'center',
        verticalPosition: 'bottom'
        
      })
    }*/

    fakeLoading(){
      this.loading = true;
      setTimeout(() => {

        //Redireccionamos al dashboard
        this.router.navigate(['dashboard']);
      }, 1500)
    }

}
