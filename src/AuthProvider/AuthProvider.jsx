import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.init";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import axios from "axios";


// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const axiosPublic = useAxiosPublic()




    // signup with email
    const signUpWithEmail = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInwithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateProfileData = (updateDatas) => {
        setLoading(true)
        return updateProfile(auth.currentUser, updateDatas)
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    // provider login
    const googleProvider = new GoogleAuthProvider()
    const GoogleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const githubProvider = new GithubAuthProvider()
    const githubLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            setLoading(false)
            setUser(currentUser)
            // console.log(import.meta.env.VITE_API_URL);
            // console.log(localStorage.getItem("access-token"));
            
            
            if (currentUser) {
                // save data user
                // await axios.post(`https://medicine-selling-e-commerce-server.vercel.app/users/${currentUser?.email}`,{
                //     name: currentUser?.displayName,
                //     image: currentUser?.photoURL,
                //     email: currentUser?.email,
                // })
                

                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                        
                    })
            }
            else{
                //TODO: remove token(if token stored in the client store in the local storage, caching, in memory)
                localStorage.removeItem('access-token')
            }
        })
        return () => {
            unSubscribe()
        }

    }, [axiosPublic])
    // console.log(user);
    

    const authInfo = {
        loading,
        signUpWithEmail,
        signInwithEmail,
        updateProfileData,
        signOutUser,
        user,
        GoogleLogin,
        githubLogin

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}

        </AuthContext.Provider>
    );
};

export default AuthProvider;