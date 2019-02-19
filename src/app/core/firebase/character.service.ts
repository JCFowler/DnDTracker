import { Injectable } from '@angular/core';
import { Character } from '~/app/shared/models/character';
import { CharacterCreateForm } from '~/app/shared/models/forms/character-form.model';

const firebaseWebApi = require('nativescript-plugin-firebase/app');
const firebase = require('nativescript-plugin-firebase');

@Injectable()
export class CharacterService {
    constructor() { }

    public async createNewCharacter(character: CharacterCreateForm, userUid: string) {
        return await firebaseWebApi.firestore().collection('users').doc(userUid).collection('characters').doc(character.uid).set(character);
    }

    public async getAllCharacters(userUid: string) {
        return await firebaseWebApi.firestore().collection('users').doc(userUid).collection('characters').get();
    }

    // getFromFirebase() {
    //     testCollection.get().then(querySnapshot => {
    //         querySnapshot.forEach(doc => {
    //           console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    //         });
    //       });
    // }
}
