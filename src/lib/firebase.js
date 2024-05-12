// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAjIchfrCqsQu7oUJWWtjkDhiOWf_QPf68",
    authDomain: "blog-app-55757.firebaseapp.com",
    projectId: "blog-app-55757",
    storageBucket: "blog-app-55757.appspot.com",
    messagingSenderId: "770792484080",
    appId: "1:770792484080:web:68f8a659c174c544e1e635",
    measurementId: "G-6HWPKV62LG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;