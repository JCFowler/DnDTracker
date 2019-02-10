import { Injectable } from '@angular/core';
import { Character } from '~/app/shared/models/character';

const firebaseWebApi = require('nativescript-plugin-firebase/app');
const firebase = require('nativescript-plugin-firebase');

@Injectable()
export class CharacterService {
    constructor() { }

    public async addNewCharacter(character: Character, userUid: string) {
        return await firebaseWebApi.firestore().collection('users').doc(userUid).collection('characters').add(character);
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
