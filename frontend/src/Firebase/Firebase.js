import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyCG3LjSIN9bOk9BCSyYhg3HR183AZDl7ao",
    authDomain: "prolifictech-afdb5.firebaseapp.com",
    projectId: "prolifictech-afdb5",
    storageBucket: "prolifictech-afdb5.appspot.com",
    messagingSenderId: "1059851472673",
    appId: "1:1059851472673:web:b79a40ca8a23c878457860",
    measurementId: "G-KPKYJS8H1G",
    databaseURL: "https://prolifictech-afdb5-default-rtdb.firebaseio.com/"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()
  
  firebase.analytics();
  
  export {
      storage, firebase as default
  }