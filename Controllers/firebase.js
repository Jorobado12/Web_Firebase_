import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";

//auth
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    sendPasswordResetEmail,
    deleteUser
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

//firestore
import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCi7GSvp53xSF2wXq2N-rjnPmUh0aNGiYo",
    authDomain: "appweb-5bc8d.firebaseapp.com",
    projectId: "appweb-5bc8d",
    storageBucket: "appweb-5bc8d.appspot.com",
    messagingSenderId: "551827984747",
    appId: "1:551827984747:web:196f48e4aca49cd9003c2e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;
const db = getFirestore(app);

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

//-----------------------------------------------------------------------------------------
//Metodos autenticacion firebase

// Iniciando con Facebook
export const popup_facebook = () =>
    signInWithPopup(auth, providerFacebook)
        .then((result) => {
            const user = result.user;

            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            return accessToken;
        })
        .catch((error) => {
            console.error("Error al iniciar sesión con Facebook:", error);

            let errorMessage;
            switch (error.code) {
                case "auth/account-exists-with-different-credential":
                    alert("Ya existe una cuenta asociada con este correo electrónico. Por favor, inicia sesión con otro método.");
                    break;
                default:
                    errorMessage = "Error al iniciar sesión con Facebook. Por favor, inténtalo de nuevo más tarde.";
                    break;
            }
            throw new Error(errorMessage);
        });


//iniciando y registrandose con google
export const popup = () => {
    return signInWithPopup(auth, providerGoogle)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            return user; // Devolver el usuario después de iniciar sesión
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            throw error; // Re-lanzar el error para manejarlo en el código que llama a esta función
        });
};

//enviar correo verificacion registro
export const confi = () => sendEmailVerification(auth.currentUser)

//metodo de autenticacion de usuario
export const login_auth = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

//cerrar sesion del usuario
export const loginout = () =>
    signOut(auth);

// Estado del usuario logeado
export function userstate() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid)
        } else {
            window.location.href = '../index.html'
        }
    });
}
//registro
export const registerauth = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password)

//recuperar contraseña
export const recovery_pass = (email) =>
    sendPasswordResetEmail(auth, email)

//eliminar usuario
export const deleteuser = (user) =>
    deleteUser(user)

  export { auth }; // Exportar la instancia de autenticación


export const addDataUser = (Id, name, Fecha, direccion, telefono,gen , sangre,email) =>
    addDoc(collection(db, "users"), {
        userIdentification: Id,
        userName: name,
        userBDaten: Fecha,
        userAddr: direccion,
        userPhone: telefono,
        userGen: gen,
        userRh: sangre,
        userEmail: email

    })

    export const getUserEmail = () => {
        const user = getAuth().currentUser
        if (user != null) {
            return user.email
        }
        return null
    }
 //mostrar productos
 export const AdminUser=()=>
    getDocs(collection(db, "users"));