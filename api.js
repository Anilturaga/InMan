/*
import * as firebase from "@firebase/app";

// Add the Firebase services that you want to use
import "@firebase/auth";
import "@firebase/database";
*/
import * as firebase from 'firebase';

import {
  signup,
  dataAction,
  productsAction,
  logoutAction,
  analyticsAction,
} from './redux/actions.js';
import { store } from './redux/store';

//import firestore from '@react-native-firebase/firestore';
// Initialize Firebase
const firebaseConfig = {
  
};

try {
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  console.log('working till db');
  var db = firebase.database();
  console.log('initialized db:', db);
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}
export const _loadLogin = () => {
  firebase
    .auth()
    .signInAnonymously()
    .catch(err => {
      console.log('Error getting documents', err);
    });
};
export const _dataHydrate = user => {
  if (typeof variable === 'undefined') {
    var db = firebase.database();
  }
  console.log('Dehydrate user: ', user);
  switch (user.userType) {
    case 'T':
      db.ref('/Territories/' + user.territory)
        .once('value')
        .then(function(data) {
          console.log('Territory', user.territory);
          console.log('hydrate T: ', data.val());
          store.dispatch(dataAction(data.val()));
          _analyticsHydrate(data.val());
        });
      break;
    case 'F':
      db.ref('/Territories/' + user.territory + '/' + user.f).on(
        'value',
        function(data) {
          console.log('hydrate F: ', data);
          store.dispatch(dataAction(data.val()));
          _analyticsHydrate(data.val());
        }
      );
      break;
    case 'admin':
      db.ref('/Territories/')
        .once('value')
        .then(function(data) {
          console.log('hydrate admin: ', data);
          store.dispatch(dataAction(data.val()));
          _analyticsHydrate(data.val());
        });
      break;
  }
};
export const _analyticsHydrate = data => {
  const storeCopy = store.getState();
  var allProducts = [];
  var allSupervisor = [];
  for (let product in storeCopy.products) {
    allProducts.push([product, 0]);
    allSupervisor.push([product, 0]);
  }
  var allTerr = [];
  var allProductsCopy = [];
  var topTerr = [];
  var counter = 0;
  var indexP = 0;
  console.log('allProducts initialised', allProducts);
  if (storeCopy.user.userType === 'admin') {
    console.log('Analytics user api');
    for (let terr in data) {
      var indexT = Object.keys(data).indexOf(terr);
      allProductsCopy[counter] = [];
      for (let product in storeCopy.products) {
        allProductsCopy[counter].push([product, 0]);
      }
      allTerr.push([terr, allProductsCopy[counter]]);
      counter = counter + 1;
      console.log('before allTerr', allTerr);
      for (let f in data[terr]) {
        for (let s in data[terr][f]) {
          if (s !== 0 && s !== '0') {
            //console.log('Admin store', s, data[terr][f][s]);

            for (let p in data[terr][f][s]) {
              if (p !== 'lastUpdated') {
                indexP = Object.keys(storeCopy.products).indexOf(p);
                if (indexP >= 0) {
                  if (f === 'SUPERVISOR') {
                    console.log('supervisor hit', f);
                    allSupervisor[indexP][1] =
                      allSupervisor[indexP][1] + data[terr][f][s][p];
                  }
                  allProducts[indexP][1] =
                    allProducts[indexP][1] + data[terr][f][s][p];
                  allTerr[indexT][1][indexP][1] =
                    allTerr[indexT][1][indexP][1] + data[terr][f][s][p];
                }
              }
            }
          }
        }
      }
    }
    console.log('after loop', allTerr, allProducts, allSupervisor);
    store.dispatch(analyticsAction({ pie: allTerr }));
    allProducts.sort(function(a, b) {
      return b[1] - a[1];
    });
    console.log('allProducts ', allProducts);
    allProducts = allProducts.slice(0, 5);
    console.log('allproducts ', allProducts);
    allProducts.map(product => {
      console.log('Product ', product);
      indexP = Object.keys(storeCopy.products).indexOf(product[0]);
      console.log('IndexP:', indexP, 'allTerr', allTerr);

      allTerr.sort(function(a, b) {
        console.log(a, b, indexP);
        return b[1][indexP][1] - a[1][indexP][1];
      });
      console.log('sorted allTerr', allTerr);
      topTerr.push(allTerr.slice(0, 3));
    });
    store.dispatch(
      analyticsAction({
        bar: {
          productsTop: allProducts,
          terrTop: topTerr,
          allSupervisor: allSupervisor,
        },
      })
    );
    console.log('After loop', allTerr, allProducts);
    //every territory => product wise count
    //every product => top 3 territories + distributor
  } else if (storeCopy.user.userType === 'T') {
    console.log('Analytics user api');
    for (let f in data) {
      var indexF = Object.keys(data).indexOf(f);
      allProductsCopy[counter] = [];
      for (let product in storeCopy.products) {
        allProductsCopy[counter].push([product, 0]);
      }
      allTerr.push([f, allProductsCopy[counter]]);
      counter = counter + 1;
      for (let r in data[f]) {
        if (r !== 0 && r !== '0') {
          //console.log('Admin store', s, data[terr][f][s]);
          for (let p in data[f][r]) {
            if (p !== 'lastUpdated') {
              indexP = Object.keys(storeCopy.products).indexOf(p);
              if (indexP >= 0) {
                if (f === 'SUPERVISOR') {
                  allSupervisor[indexP][1] =
                    allSupervisor[indexP][1] + data[f][r][p];
                }
                allProducts[indexP][1] = allProducts[indexP][1] + data[f][r][p];
                allTerr[indexF][1][indexP][1] =
                  allTerr[indexF][1][indexP][1] + data[f][r][p];
              }
            }
          }
        }
      }
    }
    store.dispatch(analyticsAction({ pie: allTerr }));
    allProducts.sort(function(a, b) {
      return b[1] - a[1];
    });
    console.log('allProducts ', allProducts);
    allProducts = allProducts.slice(0, 5);
    console.log('allproducts ', allProducts);
    allProducts.map(product => {
      console.log('Product ', product);
      indexP = Object.keys(storeCopy.products).indexOf(product[0]);
      console.log('IndexP:', indexP, 'allTerr', allTerr);

      allTerr.sort(function(a, b) {
        console.log(a, b, indexP);
        return b[1][indexP][1] - a[1][indexP][1];
      });
      console.log('sorted allTerr', allTerr);
      topTerr.push(allTerr.slice(0, 3));
    });
    store.dispatch(
      analyticsAction({
        bar: {
          productsTop: allProducts,
          terrTop: topTerr,
          allSupervisor: allSupervisor,
        },
      })
    );
    console.log('After loop', allTerr, allProducts);
  } else {
    console.log('Analytics user api');
    for (let f in data) {
      indexF = Object.keys(data).indexOf(f);
      allProductsCopy[counter] = [];
      for (let product in storeCopy.products) {
        allProductsCopy[counter].push([product, 0]);
      }
      allTerr.push([f, allProductsCopy[counter]]);
      counter = counter + 1;
      if (f !== 0 && f !== '0') {
        //console.log('Admin store', s, data[terr][f][s]);
        for (let p in data[f]) {
          if (p !== 'lastUpdated') {
            indexP = Object.keys(storeCopy.products).indexOf(p);
            if (indexP >= 0) {
              allProducts[indexP][1] = allProducts[indexP][1] + data[f][p];
              allTerr[indexF][1][indexP][1] =
                allTerr[indexF][1][indexP][1] + data[f][p];
            }
          }
        }
      }
    }
    store.dispatch(analyticsAction({ pie: allTerr }));
    allProducts.sort(function(a, b) {
      return b[1] - a[1];
    });
    console.log('allProducts ', allProducts);
    allProducts = allProducts.slice(0, 5);
    console.log('allproducts ', allProducts);
    allProducts.map(product => {
      console.log('Product ', product);
      indexP = Object.keys(storeCopy.products).indexOf(product[0]);
      console.log('IndexP:', indexP, 'allTerr', allTerr);

      allTerr.sort(function(a, b) {
        console.log(a, b, indexP);
        return b[1][indexP][1] - a[1][indexP][1];
      });
      console.log('sorted allTerr', allTerr);
      topTerr.push(allTerr.slice(0, 3));
    });
    store.dispatch(
      analyticsAction({ bar: { productsTop: allProducts, terrTop: topTerr } })
    );
    console.log('After loop', allTerr, allProducts);
  }
};
export const _productsHydrate = () => {
  if (typeof variable === 'undefined') {
    var db = firebase.database();
  }

  db.ref('/Products/')
    .once('value')
    .then(function(data) {
      console.log('hydrate products: ', data.val());
      store.dispatch(productsAction(data.val()));
      console.log('Products from api: ', store.getState());
    });
};
export const _login = (username, password) => {
  if (typeof variable === 'undefined') {
    var db = firebase.database();
  }
  console.log('db: ', db);
  db.ref('/Auth/' + username)
    .once('value')
    .then(function(snapshot) {
      console.log('snapshot1: ', snapshot);
      if (snapshot.val()) {
        if (snapshot.val().password === password) {
          console.log('if');
          store.dispatch(
            signup({
              username: username,
              password: password,
              error: '',
              userType: snapshot.val().userType,
            })
          );
          switch (snapshot.val().userType) {
            case 'T':
              store.dispatch(signup({ territory: snapshot.val().territory }));
              break;
            case 'F':
              store.dispatch(
                signup({
                  territory: snapshot.val().territory,
                  f: snapshot.val().f,
                })
              );
              break;
          }
        } else {
          console.log('pass wrong');
          store.dispatch(
            signup({
              username: '',
              password: '',
              error: 'Wrong password',
            })
          );
        }
      } else {
        console.log('u dont');
        store.dispatch(
          signup({
            username: '',
            password: '',
            error: 'Username does not exist',
          })
        );
      }
      console.log('snapshot2: ', snapshot);
      //var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      // ...
    });
};

export const _shopDataUpload = (territoryName, fName, shopName, data) => {
  if (typeof variable === 'undefined') {
    var db = firebase.database();
  }
  firebase
    .database()
    .ref('/Territories/' + territoryName + '/' + fName + '/' + shopName + '/')
    .set(data);
};
export const _resetPassword = (username, password) => {
  if (typeof variable === 'undefined') {
    var db = firebase.database();
  }
  firebase
    .database()
    .ref('/Auth/' + username + '/password')
    .set(password);
  store.dispatch(signup({ password: password }));
};
export const _logout = (username, password) => {
  console.log('Logout func called in api and calling store dispatch');
  var copy = store.getState();
  if (copy.user.userType === 'F') {
    db.ref('/Territories/' + copy.user.territory + '/' + copy.user.f).off(
      'value'
    );
  }
  store.dispatch(logoutAction(store.getState()));
  console.log('logout func state reset: ', store.getState());
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('User is signed in');
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    store.dispatch(signup({ userID: uid }));
    console.log('Auth state in api.js', store.getState());

    // ...
  } else {
    store.dispatch(signup({ userID: '' }));
    console.log('User is signed out');
    // User is signed out.
    // ...
  }
  // ...
});
