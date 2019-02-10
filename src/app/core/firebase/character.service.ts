import { Injectable } from '@angular/core';
import { Character } from '~/app/shared/models/character';
import { Select } from '@ngxs/store';
import { DnDUserState } from '~/app/state/dnduser.state';
import { Observable } from 'rxjs';
import { DnDUser } from '~/app/shared/models';

const firebaseWebApi = require('nativescript-plugin-firebase/app');
const firebase = require('nativescript-plugin-firebase');

@Injectable()
export class CharacterService {

    // @Select(DnDUserState.getUser) curUser$: Observable<DnDUser>;

    constructor() { }

    public async addNewCharacter(character: Character) {
        return await firebaseWebApi.firestore().collection('users').doc('VDzzg706AFZhiNGstM1oOYmOPF13').collection('characters').add(character);
        // this.curUser$.subscribe((user) => {
        //     return await firebaseWebApi.firestore().collection('users').doc(user.uid).collection('characters').set(character);
        // });
    }

    public async getAllCharacters() {
        return await firebaseWebApi.firestore().collection('users').doc('VDzzg706AFZhiNGstM1oOYmOPF13').collection('characters').get();
    }

    // getFromFirebase() {
    //     testCollection.get().then(querySnapshot => {
    //         querySnapshot.forEach(doc => {
    //           console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    //         });
    //       });
    // }
}
