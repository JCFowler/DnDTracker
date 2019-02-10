import { Component, OnInit, NgZone, SystemJsNgModuleLoader } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';

import { City } from '~/app/shared/models/city';
import { Observable } from 'rxjs';
import { firestore } from 'nativescript-plugin-firebase';
import { DnDUser } from '~/app/shared/models/dnduser';
import { RouterExtensions } from 'nativescript-angular/router';
import { Emitter, Emittable } from '@ngxs-labs/emitter';
import { DnDUserState } from '~/app/state/dnduser.state';
import { LoginFormModel } from '~/app/shared/models/forms';

const firebaseWebApi = require('nativescript-plugin-firebase/app');
const firebase = require('nativescript-plugin-firebase');


const testCollection = firebaseWebApi.firestore().collection('test');
const userCollection = firebaseWebApi.firestore().collection('users');


// const unsubscribe = testCollection.onSnapshot((snapshot: firestore.QuerySnapshot) => {
//     snapshot.forEach(city => console.log(city.data()));
//   });

@Component({
    selector: 'ns-home',
    moduleId: module.id,
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  @Emitter(DnDUserState.logout)
  public logoutEmitter: Emittable<LoginFormModel>;

    public myCities$: Observable<Array<City>>;


    username = '';
    password = '';

    curUser = '';

    // currentUser: DnDUser = { name: '', email: '' };

    public cities: City[] = [];

    constructor(private zone: NgZone,
      private routerExtenions: RouterExtensions,
      ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // testCollection.get().then(querySnapshot => {
        //     querySnapshot.forEach(doc => {
        //         this.cities.push(<City>doc.data())
        //     });
        //   });
        // const user = firebaseWebApi.auth().currentUser;

        // console.log(this.currentUser);
        // firebase.getCurrentUser()
        //     .then(user => {
        //         //   console.log("Here")
        //         this.curUser = user.email;
        //         this.currentUser.name = user.name;
        //         this.currentUser.email = user.email;

        //         console.log('Current User: ' + this.currentUser.name);
        //         console.log(this.currentUser.email);
        //     })
        //     .catch(error => console.log('Trouble in paradise: ' + error));

        // console.log(user)
          this.myCities$ = Observable.create(subscriber => {
            const colRef: firestore.CollectionReference = firebaseWebApi.firestore().collection('test');
            colRef.get().then(querySnapshot => {
              querySnapshot.forEach(doc => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                this.cities = [];
                querySnapshot.forEach(docSnap => this.cities.push(<City>docSnap.data()));
                subscriber.next(this.cities);
              });
            });

            // colRef.orderBy('name', 'desc').onSnapshot((snapshot: firestore.QuerySnapshot) => {
            //   this.zone.run(() => {
            //     this.cities = [];
            //     snapshot.forEach(docSnap => this.cities.push(<City>docSnap.data()));
            //     subscriber.next(this.cities);
            //   });
            // });
          });
    }

    signIn() {
        this.createUserWithEmailAndPassword(this.username, this.password);

        // firebaseWebApi.auth().signInWithEmailAndPassword(this.username, this.password)
        //     .then(() => console.log("User logged in"))
        //     .catch(err => console.log("Login error: " + JSON.stringify(err)));
    }

    public createUserWithEmailAndPassword(email: string, password: string): Promise<DnDUser> {
        return new Promise((resolve, reject) => {
          firebase.createUser({
            email: email,
            password: password
          }).then((user: DnDUser) => {
            // this.currentUser = user;
            resolve(user);
          }).catch(err => reject(err));
        });
      }

      public logout() {
        this.logoutEmitter.emit();
      }

    //   public doWebCreateUser(): void {
    //     firebaseWebApi.auth().createUserWithEmailAndPassword('eddyverbruggen+firebasewebapi@gmail.com', 'firebase')
    //         .then((user: User) => {
    //           console.log("User created: " + JSON.stringify(user));
    //           this.set("userEmailOrPhone", user.email);
    //           alert({
    //             title: "User created",
    //             message: JSON.stringify(user),
    //             okButtonText: "Nice!"
    //           });
    //         })
    //         .catch(
    //             error => {
    //               console.log("Error creating user: " + error);
    //               alert({
    //                 title: "No user created",
    //                 message: JSON.stringify(error),
    //                 okButtonText: "OK, got it"
    //               });
    //             }
    //         );
    //   }

    getFromFirebase() {
        testCollection.get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
              console.log('***');
            });
          });
    }

    addToFirebase() {
        //   testCollection.add({
        //     name: "San Francisco",
        //     state: "CA",
        //     country: "USA",
        //     capital: false,
        //     population: 860000,
        //     location: firebase.firestore().GeoPoint(4.34, 5.67)
        //   }).then(documentRef => {
        //     console.log(`San Francisco added with auto-generated ID: ${documentRef.id}`);
        //   });

        let num = this.cities.length + 1;

        let d: City = {
            name: num.toString(),
            state: num.toString(),
            population: num.toString()
        };

        testCollection.add(d).then(documentRef => {
                console.log(`${num} added with auto-generated ID: ${documentRef.id}`);
              });

        //   testCollection.doc("LA").set({
        //     name: "Los Angeles",
        //     state: "CA",
        //     country: "USA",
        //     capital: false,
        //     population: 3900000
        //   });
        // alert(this.someText)
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
