import { useState } from "react"
import { useAuth } from "@clerk/clerk-react"
export default function Admin() {
    const { getToken } = useAuth()
    const [display, setDisplay] = useState("hidden")
    const [jobRole, setJobRole] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [location, setLocation] = useState("")
    const [salary, setSalary] = useState("")
    async function handleSubmit(e) {
        const token = await getToken();
        e.preventDefault()
        const res = await fetch("http://localhost:4009/admin/job", {
            headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}`, },
            method: "POST",
            body: JSON.stringify({
                jobRole: jobRole,
                jobDescription: jobDescription,
                companyName: companyName,
                location: location,
                salary: salary
            })
        })
        const data = await res.json()
        console.log("Response data:", data)
    }
    return (
        <div className="w-screen min-h-screen flex items-center justify-center bg-black">
            <div>
                <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => setDisplay(display === "hidden" ? "block" : "hidden")}>Create</button>
            </div>
            {/* <form onSubmit={handleSubmit}> */}
                <div className={`bg-gray-800 flex flex-col  p-4 ${display}`}>
                    <input className="bg-gray-700 text-white p-2 rounded-md mb-2" type="text" placeholder="Job Role" value={jobRole} onChange={(e) => setJobRole(e.target.value)} />
                    <input className="bg-gray-700 text-white p-2 rounded-md mb-2" type="textbox" placeholder="Job Description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                    <input className="bg-gray-700 text-white p-2 rounded-md mb-2" type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    <input className="bg-gray-700 text-white p-2 rounded-md mb-2" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <input className="bg-gray-700 text-white p-2 rounded-md mb-2" type="text" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                    <button type="submit" className="bg-red-500 text-white p-2 rounded-md" onClick={handleSubmit}>Submit</button>
                </div>
            {/* </form> */}
        </div>
    )
}