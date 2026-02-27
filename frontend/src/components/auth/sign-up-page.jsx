import { SignUp } from "@clerk/clerk-react";
// import { useEffect } from "react";
export default function SignUpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="p-4">
                <SignUp routing="path" path="/sign-up" />
            </div>
        </div>
    )
}