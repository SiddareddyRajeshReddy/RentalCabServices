 import React from "react";
import { useGoogleLogin } from '@react-oauth/google';

function GoogleLogin() {
    const responseGoogle = async (authResult) => {
        try {
            if(authResult['code'])
            {
                const result = await googleAuth(authResult['code']);
                const { email, name, image } = result.data.user
                console.log(result.data.user)
            }
        } catch (err) {
            console.log(err);
        }
    };

    const login = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',  
    });

    return (
        <button onClick={login} className="h-[10%] m-10">
            <div className="flex justify-around items-center bg-white gap-3 px-4 py-2 inter-500 rounded-2xl">
                <img src="./google.svg" alt="" className="w-[50px] bg-white p-[0.5rem]" />
                <p className="text-2xl">Sign In with Google</p>
            </div>
        </button>
    );
}

export default GoogleLogin;