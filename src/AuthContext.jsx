import { createContext, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
export const Auth = createContext();
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXl5ym2hay9JRvwZlfQMmL3DMTUO8KNMI",
  authDomain: "form-registration-react.firebaseapp.com",
  projectId: "form-registration-react",
  storageBucket: "form-registration-react.firebasestorage.app",
  messagingSenderId: "718048738334",
  appId: "1:718048738334:web:b8686386fba222b0b7420f",
  measurementId: "G-8DEWHTFDXV",
  databaseURL: "https://form-registration-react-default-rtdb.firebaseio.com/",
};
export const app = initializeApp(firebaseConfig);
const FireBaseAuth = getAuth(app);
const FirebaseDatabase = getDatabase(app);
function AuthContext({ children }) {
  const CreateEmailandPassword = (email, password) => {
    return createUserWithEmailAndPassword(FireBaseAuth, email, password);
  };
  const SignUpEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(FireBaseAuth, email, password);
  };
  const FireBasePutData = (key, data) => set(ref(FirebaseDatabase, key), data);
  return (
    <Auth.Provider
      value={{
        CreateEmailandPassword,
        SignUpEmailAndPassword,
        FireBasePutData,
      }}
    >
      {children}
    </Auth.Provider>
  );
}
export const UserAuth = () => useContext(Auth);
export default AuthContext;
