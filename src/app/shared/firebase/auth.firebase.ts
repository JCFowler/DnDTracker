import { Injectable } from '@angular/core';
import { DnDUser } from '../models';
import { ServerErrorHandlerService } from '~/app/core/services';
import { LoginFormModel, RegisterFormModel } from '../models/forms';

const firebaseWebApi = require('nativescript-plugin-firebase/app');
const firebase = require('nativescript-plugin-firebase');

const testCollection = firebaseWebApi.firestore().collection('test');

@Injectable()
export class AuthFirebase {

    constructor() { }

    public getCurrentUser(
        errorHandler: (error: any) => void,
        successHandler: (ptItem: DnDUser) => void
    ) {
        firebase.getCurrentUser()
            .catch(errorHandler)
            .then(successHandler);
    }

    public signIn(
        info: LoginFormModel,
        errorHandler: (error: any) => void,
        successHandler: () => void
    ) {
        firebaseWebApi.auth().signInWithEmailAndPassword(info.email, info.password)
            .then(successHandler)
            .catch(errorHandler);
    }

    public createUserwithEmail(
        info: RegisterFormModel,
        errorHandler: (error: any) => void,
        successHandler: () => void
    ) {
        firebase.createUser({
            email: info.email,
            password: info.password
        })
            .then(successHandler)
            .catch(errorHandler);
    }
}

