import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Logger } from '../logger.service';

const log = new Logger('Firebase authentication service');
@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  constructor(private afAuth: AngularFireAuth) {}
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async AuthLogin(provider: auth.AuthProvider): Promise<any> {
    return await this.afAuth.auth.signInWithPopup(provider);
  }
}
