// js/firebase-config.js

const firebaseConfig = {
    apiKey: "AIzaSyCuvUAmLql55QNWWbnONkkWPGiTrpHjZEg",
    authDomain: "mon-site-78ef3.firebaseapp.com",
    databaseURL: "https://mon-site-78ef3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mon-site-78ef3",
    storageBucket: "mon-site-78ef3.firebasestorage.app",
    messagingSenderId: "198720020138",
    appId: "1:198720020138:web:1b8fa77cb558762ea9bad3",
    measurementId: "G-B5DSHWBZFQ"
};

// Initialize Firebase using the compat libraries loaded in HTML
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Export for other scripts to use
window.firebaseDB = db;
window.firebaseRef = (db, path) => db.ref(path);
window.firebaseOnValue = (ref, callback) => ref.on('value', callback);
window.firebasePush = (ref, data) => ref.push(data);
