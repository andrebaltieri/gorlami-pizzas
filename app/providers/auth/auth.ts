import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Firebase from 'firebase';

@Injectable()
export class AuthProvider {
  public auth: any;
  public userProfile: any;

  constructor(private http: Http) {
    this.auth = Firebase.auth();
    this.userProfile = Firebase.database().ref('/users');
  }

  loginUser(email: string, password: string): any {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): any {
    return this.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.auth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
        this.userProfile.child(authenticatedUser.uid).set({
          email: email
        });
      });
    });
  }

  resetPassword(email: string): any {
    return this.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.auth.signOut();
  }
}

