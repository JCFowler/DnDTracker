import { Injectable } from '@angular/core';
import { AdventureCreateForm } from '~/app/shared/models/forms/adventure-form.model';

const firebaseWebApi = require('nativescript-plugin-firebase/app');
const firebase = require('nativescript-plugin-firebase');

@Injectable()
export class AdventureService {

    constructor() { }

    public async createNewAdventure(adventure: AdventureCreateForm, userUid: string, characterUid: string) {
        return await firebaseWebApi.firestore().collection('users').doc(userUid)
            .collection('characters').doc(characterUid).collection('adventures').doc(adventure.uid).set(adventure);
    }

    public async getAllAdventures(userUid: string, characterUid: string) {
        return await firebaseWebApi.firestore().collection('users').doc(userUid)
            .collection('characters').doc(characterUid).collection('adventures').get();
    }
}
