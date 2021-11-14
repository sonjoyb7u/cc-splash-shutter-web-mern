import initializeAuthentication from "../../pages/Login/Firebase/firebase.init";
import { GoogleAuthProvider, signInWithPopup, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

// Initialize Firebase API ...
initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isUserComing, setIsUserComing] = useState(true);
    const [authSuccessMsg, setAuthSuccessMsg] = useState('');
    const [authErrorMsg, setAuthErrorMsg] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [userRole, setUserRole] = useState(false);

    // User Global Auth ...
    const auth = getAuth();

    // User Custom Registration Process ...
    const userCustomRegistrationProcess = (displayName, email, imageUrl, password, history, location) => {
        setIsUserComing(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const registerNewUser = {displayName: displayName, email, photoURL: imageUrl}
            setUser(registerNewUser);
            // console.log(registerNewUser);

            // Create/Save Register User Into MongoDb ... 
            createRegisterUserToDb(email, displayName, imageUrl, 'POST')

            // Create&Update New User Full_name & user_name ...
            updateProfile(auth.currentUser, {
                displayName: displayName,
                photoURL: imageUrl,

            }).then(() => {
                // Profile updated!
            }).catch((error) => {
                // An error occurred
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode, errorMessage);
                setAuthSuccessMsg('');
                setAuthErrorMsg(errorMessage);
            });
            // alert("You registration success & you are logged in...");
            setAuthErrorMsg('');
            setAuthSuccessMsg("Your Registration Success, Enjoy...");
            // const redirect_url = location?.state?.from || '/'
            // history.replace(redirect_url);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode, errorMessage);
            setAuthSuccessMsg('');
            setAuthErrorMsg(errorMessage);
        })
        .finally(() => setIsUserComing(false));
    }


    // User Custom Login Process ... 
    const userCustomLoginProcess = (email, password, location, history) => {
        setIsUserComing(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            // setAuthErrorMsg('');
            // setAuthSuccessMsg("You Are Successfully Logged In, Enjoy...");
            // console.log(location?.state?.from );
            const redirect_url = location?.state?.from || '/';
            history.replace(redirect_url);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode, errorMessage);
            setAuthSuccessMsg('');
            setAuthErrorMsg(errorMessage);
        })
        .finally(() => setIsUserComing(false));

    };


    // User Google API Sign-in Process ... 
    const googleProvider = new GoogleAuthProvider();
    const userSignInWithGoogleProcess = (location, history) => {
        setIsUserComing(true);
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            // Create/Save Register User Into MongoDb ... 
            createRegisterUserToDb(user.email, user.displayName, user.photoURL, 'PUT');
            // setAuthErrorMsg('');
            // setAuthSuccessMsg("You Are Successfully Logged In, Enjoy...");
            // console.log(location?.state?.from );
            const redirect_url = location?.state?.from || '/';
            history.replace(redirect_url);

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode, errorMessage);
            setAuthSuccessMsg('');
            setAuthErrorMsg(errorMessage);
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        })
        .finally(() => setIsUserComing(false));
    };


    // Save Register Custom/Google User Into MongoDb Process... 
    const createRegisterUserToDb = (email, displayName, imageUrl, method) => {
        const newRegisterUserInfo = {email, displayName, imageUrl};
        // checkUserRoleFromDB(email);
        if(!isAdmin) {
            newRegisterUserInfo.role = "guest";
        }
        const url = `http://localhost:5001/users`;
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRegisterUserInfo)
        })
        .then()
        .then()
    };

    // const checkUserRoleFromDB = (email) => {
    //     const url = `http://localhost:5001/users/${email}`;
    //     fetch(url)
    //     .then(res => res.json())
    //     .then(result => {
    //         setUserRole(result)
    //     })
    // }


    // Get & Check/Observing the currently User state position ...
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in ...
                const uid = user.uid;
                setUser(user);

            } else {
                // User is signed out ...
                setUser({})
            }
            setIsUserComing(false);
        });

        return () => unsubscribed;

    }, [auth]);


    // Check User Is Admin Or Not Process ... 
    useEffect(() => {
        const url = `http://localhost:5001/users/${user?.email}`;
        fetch(url)
        .then(res => res.json())
        .then(result => {
            // console.log(result);
            if(result?.role === 'admin') {
                setIsAdmin(true);
            }
            else {
                setIsAdmin(false);
            }
        })

    }, [user?.email])


    // User Logout Process ...
    const userLogoutProcess = (location, history) => {
        signOut(auth)
        .then(() => {
            // Sign-out successful.
            // alert("You Are Successfully Logged Out, Please Again Login...");

            setAuthErrorMsg('');
            setAuthSuccessMsg('');
            setUser({});
            const redirect_url = location?.state?.from || '/login';
            history.replace(redirect_url);

        }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode, errorMessage);
            setAuthSuccessMsg('');
            setAuthErrorMsg(errorMessage)
        })
        .finally(() => setIsUserComing(false));
    };



    return {
        user,
        setUser,
        isUserComing,
        userCustomRegistrationProcess,
        userCustomLoginProcess,
        userSignInWithGoogleProcess,
        setAuthSuccessMsg,
        authSuccessMsg,
        setAuthErrorMsg,
        authErrorMsg,
        isAdmin,
        userLogoutProcess,
    }

}



export default useFirebase;