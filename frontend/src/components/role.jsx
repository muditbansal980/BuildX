import { Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton, useUser, useAuth } from '@clerk/clerk-react';
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { getToken, isSignedIn } = useAuth()
    const { user } = useUser()
    const navigate = useNavigate();
    console.log("isSignedIn:", isSignedIn, "user:", user);
    async function UserUpload() {
        const token = await getToken();
        console.log(token)
        const res = await fetch("http://localhost:4009/role/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "POST",
            body: JSON.stringify({
                username: user?.username || null,
                email: user?.primaryEmailAddress?.emailAddress || null,
            })
        });
    }
    async function CompanyRole() {
        console.log("Company role selected");
        const res = await fetch("http://localhost:4009/role/company", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getToken()}`,
            },
            method: "PUT",
            body: JSON.stringify({
                username: user?.username || null,
                email: user?.primaryEmailAddress?.emailAddress || null,
                role: "company"
            })
        });
        if (res.ok) {
            console.log("Role updated successfully");
            navigate("/admin");
        } else {
            console.error("Failed to update role");
        }
    }
    async function CandidateRole() {
        console.log("Candidate role selected");
        const res = await fetch("http://localhost:4009/role/candidate", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getToken()}`,
            },
            method: "PUT",
            body: JSON.stringify({
                username: user?.username || null,
                email: user?.primaryEmailAddress?.emailAddress || null,
                role: "candidate"
            })
        });
        if (res.ok) {
            console.log("Role updated successfully");
            navigate("/candidate");
        } else {
            console.error("Failed to update role");
        }
    }
    useEffect(() => {
        if (isSignedIn) {
            console.log("User is signed in ")
            UserUpload()
        }
        console.log("User is not signed in ");
    }, [isSignedIn])
    return (
        <div className="w-screen min-h-screen flex items-center justify-center bg-black">
            <div>
                <div className="font-bold text-3xl sm:text-5xl text-white mb-6">Choose your role</div>
                <div className="flex gap-5">
                    <div className="p-4 border-2 border-red-500 sm:text-3xl text-white font-bold rounded-md hover:bg-gray-300 " onClick={CompanyRole}>
                        Company
                    </div>
                    <div className="p-4 border-2 border-red-500 sm:text-3xl text-white font-bold rounded-md hover:bg-gray-300" onClick={CandidateRole}>
                        Candidate
                    </div>
                </div>
            </div>
        </div>
    )
}