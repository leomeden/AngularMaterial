import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserAuth } from '../interfaces/user-auth';
import { UserDetail } from 'src/app/interfaces/user-detail';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData!: any;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
   }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password

  SignUp(userDetail: UserDetail, pass: string) {
    this.afAuth
      .createUserWithEmailAndPassword(userDetail.email, pass)
      .then((result) => {
        // Call the SendVerificaitonMail() function when new user sign 
        //up and returns promise 
        //this.SendVerificationMail();
        //this.SetUserData(result.user);
        console.log("usuario creado: ", result.user);

        console.log("uid de usuario creado", result.user?.uid)

        if (result.user?.uid) {
          userDetail.uid = result.user?.uid;
          this.UpdateUserData(userDetail);
        }

        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        //this.SetUserData(result.user);
        //return result.user?.uid || null

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }


  /*SignUp(email: string, password: string): any {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Call the SendVerificaitonMail() function when new user sign 
        //up and returns promise 
        //this.SendVerificationMail();
        //this.SetUserData(result.user);
        console.log("usuario creado: ", result.user);

        console.log("uid de usuario creado", result.user?.uid)

        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        //this.SetUserData(result.user);

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }*/

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: UserAuth = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  UpdateUserData(user: UserDetail) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.set(user, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
