import { createContext, useContext, useState } from "react";
import { auth } from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)


    // signup with email
    const signUpWithEmail = (email, password) =>{
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInwithEmail = (email,password)=>{
        setLoading(false)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const updateProfileData = (updateDatas)=>{
        setLoading(false)
        return updateProfile(auth.currentUser, updateDatas)
    }
    const signOutUser = ()=>{
        setLoading(false)
        return signOut(auth)
    }

    const authInfo = {
        loading,
        signUpWithEmail,
        signInwithEmail,
        updateProfileData,
        signOutUser

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;