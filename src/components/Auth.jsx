import React, { useState } from "react";
//phương thức của firebase
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
function Auth(props) {
    let [email, setemail] = useState("");
    let [password, setpassword] = useState("");

    let handleChangeEmail = (e) => {
        setemail(e.target.value);
    };

    let handleChangePass = (e) => {
        setpassword(e.target.value);
    };
    let handleClick = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    };

    let handleWithGG = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    };

    let handleLogOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input
                type="email"
                placeholder="enter your email..."
                onChange={(e) => handleChangeEmail(e)}
            />
            <br />
            <br />

            <input
                type="password"
                placeholder="enter your password..."
                onChange={(e) => handleChangePass(e)}
            />
            <br />
            <br />

            <button onClick={() => handleClick()}>sign in </button>
            <br />
            <br />

            <button onClick={() => handleWithGG()}>sign in with google</button>
            <br />
            <br />
            <button
                onClick={() => {
                    handleLogOut();
                }}
            >
                Log out
            </button>
        </div>
    );
}

export default Auth;
