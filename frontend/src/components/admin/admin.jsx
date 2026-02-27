// import { useState } from "react"
// import { useAuth } from "@clerk/clerk-react"
// export default function Admin() {
//     const { getToken } = useAuth()
//     const [display, setDisplay] = useState("hidden")
//     const [jobRole, setJobRole] = useState("")
//     const [jobDescription, setJobDescription] = useState("")
//     const [companyName, setCompanyName] = useState("")
//     const [location, setLocation] = useState("")
//     const [salary, setSalary] = useState("")
//     async function handleSubmit(e) {
//         const token = await getToken();
//         e.preventDefault()
//         const res = await fetch("http://localhost:4009/admin/job", {
//             headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}`, },
//             method: "POST",
//             body: JSON.stringify({
//                 jobRole: jobRole,
//                 jobDescription: jobDescription,
//                 companyName: companyName,
//                 location: location,
//                 salary: salary
//             })
//         })
//         const data = await res.json()
//         console.log("Response data:", data)
//     }
//     return (
//         <div className="w-screen min-h-screen flex items-center justify-center bg-black">
//             <div>
//                 <button className="bg-red-500 text-white p-2 rounded-md" onClick={() => setDisplay(display === "hidden" ? "block" : "hidden")}>Create</button>
//             </div>
//             {/* <form onSubmit={handleSubmit}> */}
//                 <div className={`bg-gray-800 flex flex-col  p-4 ${display}`}>
//                     <input className="bg-gray-700 text-white p-2 rounded-md mb-2" type="text" placeholder="Job Role" value={jobRole} onChange={(e) => setJobRole(e.target.value)} />
//                     <input className="bg-gray-700 text-white p-2 rounded-md mb-2" type="textbox" placeholder="Job Description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
//                     <input className="bg-gray-700 text-white p-2 rounded-md mb-2" type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
//                     <input className="bg-gray-700 text-white p-2 rounded-md mb-2" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
//                     <input className="bg-gray-700 text-white p-2 rounded-md mb-2" type="text" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
//                     <button type="submit" className="bg-red-500 text-white p-2 rounded-md" onClick={handleSubmit}>Submit</button>
//                 </div>
//             {/* </form> */}
//         </div>
//     )
// }

import { useState } from "react"
import { useAuth } from "@clerk/clerk-react"
import Sidebar from "../sidebar"
import Navbar from "../navbar"
export default function Admin() {
    const { getToken } = useAuth()
    const [display, setDisplay] = useState("hidden")
    const [sidebardisplay, setSidebarDisplay] = useState("hidden")
    const [jobRole, setJobRole] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [location, setLocation] = useState("")
    const [salary, setSalary] = useState("")

    async function handleSubmit(e) {
        const token = await getToken();
        e.preventDefault()
        const res = await fetch("http://localhost:4009/admin/job", {
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, },
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
        <>
        <Navbar />
        {/* <Sidebar/> */}
        <div className="w-full min-h-[calc(100vh-60px)] bg-[#07090d] flex overflow-x-hidden">
            {/* ── Main area ── */}
            <div className="flex-1 flex flex-col">

                {/* Top bar */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-[#111827] w-full">
                    <div>
                        {/* <p className="text-white cursor-pointer" onClick={() => setSidebarDisplay(sidebardisplay === "hidden" ? "block" : "hidden")}>Sidebar</p> */}
                        <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-red-500 flex items-center gap-2">
                            <span className="inline-block w-6 h-px bg-red-500 rounded" />
                            Admin Panel
                        </p>
                        <h1 className="text-2xl font-extrabold text-slate-100 mt-1 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                            Job Listings
                        </h1>
                    </div>

                    <button
                        onClick={() => setDisplay(display === "hidden" ? "block" : "hidden")}
                        className="
                            flex items-center gap-2 px-5 py-2.5
                            bg-red-600 hover:bg-red-500
                            text-white text-sm font-semibold rounded-xl
                            shadow-lg shadow-red-900/30
                            transition-all duration-200
                            hover:shadow-red-700/40 hover:-translate-y-0.5 active:scale-95
                        "
                    >
                        {/* Plus icon */}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        Post a Job
                    </button>
                </div>

                {/* Content area */}
                <div className="flex-1 px-8 py-8">

                    {/* Modal / slide-down form panel */}
                    <div className={`${display} mb-8`}>
                        <div className="
                            bg-[#0d1117] border border-[#1a2235]
                            rounded-2xl p-7 max-w-2xl w-full
                            shadow-2xl shadow-black/60
                            relative overflow-hidden
                        ">
                            {/* Red glow top-right */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

                            {/* Form header */}
                            <div className="flex items-center justify-between mb-7">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-100 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                                        New Job Posting
                                    </h2>
                                    <p className="text-xs text-slate-500 mt-0.5 font-light">Fill in the details below to publish a listing.</p>
                                </div>
                                <button
                                    onClick={() => setDisplay("hidden")}
                                    className="w-8 h-8 rounded-full border border-[#1a2235] flex items-center justify-center text-slate-500 hover:border-red-500/40 hover:text-red-400 transition-all duration-200"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d="M18 6 6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gradient-to-r from-[#1a2235] to-transparent mb-7" />

                            {/* Fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-medium tracking-widest uppercase text-slate-500">Job Role</label>
                                    <input
                                        className="
                                            bg-[#0a0f18] border border-[#1a2235]
                                            text-slate-200 text-sm placeholder-slate-600
                                            rounded-xl px-4 py-3
                                            outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20
                                            transition-all duration-200
                                        "
                                        type="text"
                                        placeholder="e.g. Senior Engineer"
                                        value={jobRole}
                                        onChange={(e) => setJobRole(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-medium tracking-widest uppercase text-slate-500">Company Name</label>
                                    <input
                                        className="
                                            bg-[#0a0f18] border border-[#1a2235]
                                            text-slate-200 text-sm placeholder-slate-600
                                            rounded-xl px-4 py-3
                                            outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20
                                            transition-all duration-200
                                        "
                                        type="text"
                                        placeholder="e.g. Acme Corp"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-medium tracking-widest uppercase text-slate-500">Location</label>
                                    <input
                                        className="
                                            bg-[#0a0f18] border border-[#1a2235]
                                            text-slate-200 text-sm placeholder-slate-600
                                            rounded-xl px-4 py-3
                                            outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20
                                            transition-all duration-200
                                        "
                                        type="text"
                                        placeholder="e.g. Remote / New York"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[11px] font-medium tracking-widest uppercase text-slate-500">Salary</label>
                                    <input
                                        className="
                                            bg-[#0a0f18] border border-[#1a2235]
                                            text-slate-200 text-sm placeholder-slate-600
                                            rounded-xl px-4 py-3
                                            outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20
                                            transition-all duration-200
                                        "
                                        type="text"
                                        placeholder="e.g. $80k – $100k"
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                    />
                                </div>

                            </div>

                            {/* Description — full width */}
                            <div className="flex flex-col gap-1.5 mb-7">
                                <label className="text-[11px] font-medium tracking-widest uppercase text-slate-500">Job Description</label>
                                <textarea
                                    className="
                                        bg-[#0a0f18] border border-[#1a2235]
                                        text-slate-200 text-sm placeholder-slate-600
                                        rounded-xl px-4 py-3 min-h-[110px] resize-y
                                        outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/20
                                        transition-all duration-200
                                    "
                                    placeholder="Describe the role, responsibilities, requirements…"
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    onClick={() => setDisplay("hidden")}
                                    className="
                                        px-5 py-2.5 rounded-xl
                                        border border-[#1a2235] text-slate-400 text-sm font-medium
                                        hover:border-slate-600 hover:text-slate-200
                                        transition-all duration-200 active:scale-95
                                    "
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="
                                        flex items-center gap-2
                                        px-6 py-2.5 rounded-xl
                                        bg-red-600 hover:bg-red-500 text-white text-sm font-semibold
                                        shadow-lg shadow-red-900/30 hover:shadow-red-700/40
                                        transition-all duration-200 hover:-translate-y-0.5 active:scale-95
                                    "
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    Publish Listing
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Empty state — shown when no jobs yet */}
                    {/* <div className="max-w-2xl w-full">
                        <div className="
                            border border-dashed border-[#1a2235]
                            rounded-2xl p-12
                            flex flex-col items-center justify-center text-center
                            bg-[#0d1117]/50
                        ">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 stroke-red-400" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                                    <path d="M9 3v18M3 9h18M3 15h6"/>
                                </svg>
                            </div>
                            <p className="text-slate-300 font-semibold text-sm mb-1">No listings yet</p>
                            <p className="text-slate-600 text-xs font-light max-w-xs">
                                Click <span className="text-slate-400 font-medium">Post a Job</span> above to create your first listing and start finding candidates.
                            </p>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
        </>
    )
}