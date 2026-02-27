import { SignIn} from "@clerk/clerk-react";
import {useUser} from "@clerk/clerk-react"
import { Navigate } from "react-router-dom";
import Home from "../role";
// import { useEffect } from "react"
export default function SignInPage() {
    const {isSignedIn} = useUser();
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="p-4">
                <SignIn
                    routing="path"
                    path="/"
                />
            </div>
        </div >
    )
}