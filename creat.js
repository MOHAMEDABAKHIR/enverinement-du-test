// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHOFREJNmBqtrFipoVVIoS26n0rp4CBPw",
    authDomain: "alumni-jadara.firebaseapp.com",
    projectId: "alumni-jadara",
    storageBucket: "alumni-jadara.firebasestorage.app",
    messagingSenderId: "228424888984",
    appId: "1:228424888984:web:f4fd0e288d1e87943ed6ed",
    measurementId: "G-JNH1F468T9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


//submit
const submit = document.getElementById('Submit')
submit.addEventListener('click', function (event) {
    //inputs
    const email = document.getElementById('email').value
    const password = document.getElementById('Password').value
    event.preventDefault()
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            window.location.href="dashboard.html"
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
})