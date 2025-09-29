import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOWjYClGuhzzCvb7JZdX0ckx5uR9o8GE0",
  authDomain: "netflix-clone-23bd1.firebaseapp.com",
  projectId: "netflix-clone-23bd1",
  storageBucket: "netflix-clone-23bd1.firebasestorage.app",
  messagingSenderId: "1021693503482",
  appId: "1:1021693503482:web:17970311862205ade02643"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const response = await createUserWithEmailAndPassword(auth,email,password);
        const user = response.user;
        await addDoc(collection(db, "users"), {
            uid:user.uid,
            name,
            authPovider: "local",
            email,
        })

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () =>{
    signOut(auth);
}

export {auth, db, login, signup, logout};