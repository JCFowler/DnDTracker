import { Injectable } from '@angular/core';
import { DnDUser } from '../models';
import { ServerErrorHandlerService } from '~/app/core/services';
import { LoginFormModel, RegisterFormModel } from '../models/forms';
import { User } from 'nativescript-plugin-firebase';

const firebaseWebApi = require('nativescript-plugin-firebase/app');
const firebase = require('nativescript-plugin-firebase');

const testCollection = firebaseWebApi.firestore().collection('test');

@Injectable()
export class AuthFirebase {

    constructor() { }

    public async getCurrentUser(
        // successHandler: (args: User) => void,
        // errorHandler: (error: any) => void
    ) {
        return await firebase.getCurrentUser();
        // firebase.getCurrentUser()
        //     .catch(errorHandler)
        //     .then(successHandler);
    }

    public async signIn(info: LoginFormModel) {
        return await firebaseWebApi.auth().signInWithEmailAndPassword(info.email, info.password);
    }

    public async logout() {
        return await firebase.logout();
    }

    public async createUserwithEmail(
        info: RegisterFormModel,
        // successHandler: () => void,
        // errorHandler: (error: any) => void
    ) {
        return await firebase.createUser({ email: info.email, password: info.password });
        // firebase.createUser({
        //     email: info.email,
        //     password: info.password
        // })
        //     .then(successHandler)
        //     .catch(errorHandler);
    }
}

