import firebase from 'firebase/app';
import 'firebase/database';

let config = {
        apiKey: "AIzaSyC1C7EfqxICn-3EZF9WFcEC8ZG7iNmrN0A",
        authDomain: "mm-projeto-final.firebaseapp.com",
        databaseURL: "https://mm-projeto-final.firebaseio.com",
        projectId: "mm-projeto-final",
        storageBucket: "mm-projeto-final.appspot.com",
        messagingSenderId: "451806031291",
        appId: "1:451806031291:web:8f4232417a3b072359689e"
      };
      export const firebaseImpl = firebase.initializeApp(config);
      export const firebaseDatabase = require('firebase/database');
      export const db = firebase.database();