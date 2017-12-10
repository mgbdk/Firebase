(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDM_Dkja5mBvWj17NFREmlEuAiTKUdNrWc",
    authDomain: "workingplatform-92bf8.firebaseapp.com",
    databaseURL: "https://workingplatform-92bf8.firebaseio.com",
    projectId: "workingplatform-92bf8",
    storageBucket: "",
    messagingSenderId: "89837470257"
  };
  firebase.initializeApp(config);

  var userRef = firebase.database().ref();
  
  const txtName = document.getElementById('txtName');
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  var totalMessage = 0;
  btnLogin.addEventListener('click', e => {
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
  });
  btnSignUp.addEventListener('click', e => {
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
      /*userRef.child("users").child(txtName.value).child("email").set(email);*/
      userRef.child("users").on("value", function(snapshot) {
        totalMessage = snapshot.numChildren(); 
      });
        totalMessage += 1;
        userRef.child("users").child(totalMessage).child("Username").set(txtName.value);
        userRef.child("users").child(totalMessage).child("Email").set(email);
        alert("Kayıt Oluşturuldu");


  }); 
  firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        console.log(firebaseUser);
        console.log('giris yapildi');
        window.location = "index.html";
      }
      else{
          console.log('not logged in');
      }
  });
}());