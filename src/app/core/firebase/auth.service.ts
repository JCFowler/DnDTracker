import { Injectable } from '@angular/core';
import { LoginFormModel, RegisterFormModel } from '~/app/shared/models/forms';

const firebaseWebApi = require('nativescript-plugin-firebase/app');
const firebase = require('nativescript-plugin-firebase');

@Injectable()
export class AuthService {

    constructor() { }

    public async getCurrentUser() {
        return await firebase.getCurrentUser();
    }

    public async signIn(info: LoginFormModel) {
        return await firebaseWebApi.auth().signInWithEmailAndPassword(info.email, info.password);
    }

    public async logout() {
        return await firebase.logout();
    }

    public async createUserwithEmail(info: RegisterFormModel) {
        return await firebase.createUser({ email: info.email, password: info.password });
    }
}

