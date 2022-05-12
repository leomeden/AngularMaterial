import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserDetail } from 'src/app/interfaces/user-detail';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})



export class RegistrarseComponent implements OnInit {

  form: FormGroup;
  public userDetail!: UserDetail;

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

  ngOnInit(): void {}

  registrarse() {

    console.log("formulario registro: ",this.form);

    const mail = this.form.value.mail;
    const password = this.form.value.password;

    console.log("mail en el componente: ", mail);
    console.log("password en el componente: ", password);

    this.userDetail = {
      uid : this.form.value.uid || null,
      apellido : this.form.value.apellido,
      nombre : this.form.value.nombre,
      direccion : this.form.value.direccion,
      telefono : this.form.value.telefono,
      email: this.form.value.mail,
      password: this.form.value.password
    }

    console.log("userdetail en el componente: ", this.userDetail);

    //console.log("prueba then: ",this._authService.SignUp(this.userDetail))
    this._authService.SignUp(this.userDetail)
      .then((result) => {
      // Call the SendVerificaitonMail() function when new user sign 
      //up and returns promise 
      //this.SendVerificationMail();
      //this.SetUserData(result.user);
      console.log("usuario creado: ", result.user);

      console.log("uid de usuario creado", result.user?.uid)

      //this.ngZone.run(() => {
      //  this.router.navigate(['']);
      //});
      //this.SetUserData(result.user);
      //return result.user?.uid || null

    })
    .catch((error) => {
      window.alert(error.message);
    })


    }

    

}
