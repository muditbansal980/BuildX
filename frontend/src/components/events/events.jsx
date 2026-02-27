// import { useEffect,useState } from "react";
// import { useAuth } from "@clerk/clerk-react";
// export default function Events() {
//     const [events, setEvents] = useState([]);
//     const { getToken } = useAuth()
//     useEffect(() => {
//         async function fetchEvents() {
//             const token = await getToken();
//             const res = await fetch("http://localhost:4009/events/", {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 },
//                 method: "GET",
//             })
//             const data = await res.json()
//             setEvents(data.events);
//         };
//         fetchEvents();
//     }
//     )
//     return (
//         <div>
//             <h1 className="text-3xl font-bold text-white">Events</h1>
//             <div>
//                 {events.map(event => (
//                     <div key={event.id} className="bg-gray-800 p-4 rounded-lg mb-4">
//                         <h2 className="text-xl font-semibold text-white">{event.companyname}</h2>
//                         <p className="text-gray-300">{event.location}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "../navbar";

export default function Events() {
    const [events, setEvents] = useState([]);
    const { getToken } = useAuth()

    useEffect(() => {
        async function fetchEvents() {
            const token = await getToken();
            const res = await fetch("http://localhost:4009/events/", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            })
            const data = await res.json()
            setEvents(data.events);
        };
        fetchEvents();
    }, [])

    return (
        <>
            <Navbar />
            <div className="w-full min-h-[calc(100vh-60px)] bg-[#07090d] flex">

                {/* ── Sidebar slot — drop your <Sidebar /> here ── */}
                <div id="sidebar-slot" className="w-0 flex-shrink-0 transition-all duration-300" />

                {/* ── Main area ── */}
                <div className="flex-1 flex flex-col">

                    {/* Top bar */}
                    <div className="flex items-center justify-between px-8 py-5 border-b border-[#111827]">
                        <div>
                            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-red-500 flex items-center gap-2">
                                <span className="inline-block w-6 h-px bg-red-500 rounded" />
                                Discover
                            </p>
                            <h1 className="text-2xl font-extrabold text-slate-100 mt-1 tracking-tight"
                                style={{ fontFamily: "'Syne', sans-serif" }}>
                                Events
                            </h1>
                        </div>

                        {/* Live count badge */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] border border-[#1a2235] rounded-xl">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-xs text-slate-400 font-medium">
                                {events.length} {events.length === 1 ? "Event" : "Events"} Live
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 px-8 py-8">

                        {/* ── Loading skeleton — shown when events haven't loaded ── */}
                        {events.length === 0 && (
                            <div className="max-w-3xl w-full space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-[#0d1117] border border-[#1a2235] rounded-2xl p-6 animate-pulse">
                                        <div className="flex items-start gap-4">
                                            <div className="w-11 h-11 rounded-xl bg-[#1a2235] flex-shrink-0" />
                                            <div className="flex-1 space-y-3">
                                                <div className="h-4 bg-[#1a2235] rounded-lg w-1/3" />
                                                <div className="h-3 bg-[#1a2235] rounded-lg w-1/4" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* ── Events grid ── */}
                        {events.length > 0 && (
                            <div className="max-w-3xl w-full space-y-4">
                                {events.map((event, index) => (
                                    <div
                                        key={event.id}
                                        className="
                                        group relative
                                        bg-[#0d1117] border border-[#1a2235]
                                        rounded-2xl p-6
                                        cursor-pointer overflow-hidden
                                        hover:border-red-500/40
                                        hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/15
                                        transition-all duration-300
                                    "
                                        style={{ animationDelay: `${index * 60}ms` }}
                                    >
                                        {/* Red glow on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

                                        <div className="flex items-start gap-4 relative z-10">

                                            {/* Icon */}
                                            <div className="
                                            w-11 h-11 flex-shrink-0 rounded-xl
                                            bg-red-500/10 border border-red-500/20
                                            flex items-center justify-center
                                            group-hover:bg-red-500/16 group-hover:border-red-500/35
                                            transition-all duration-300 group-hover:scale-105
                                        ">
                                                <svg className="w-5 h-5 stroke-red-400" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                                    <path d="M16 2v4M8 2v4M3 10h18" />
                                                </svg>
                                            </div>

                                            {/* Text */}
                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-base font-bold text-slate-100 tracking-tight truncate"
                                                    style={{ fontFamily: "'Syne', sans-serif" }}>
                                                    {event.companyname}
                                                </h2>

                                                <div className="flex items-center gap-1.5 mt-1.5">
                                                    <svg className="w-3.5 h-3.5 stroke-slate-500 flex-shrink-0" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                        <path d="M12 21s-8-5.6-8-11a8 8 0 1116 0c0 5.4-8 11-8 11z" />
                                                        <circle cx="12" cy="10" r="2" />
                                                    </svg>
                                                    <p className="text-xs text-slate-500 font-light truncate">{event.location}</p>
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            <div className="
                                            w-8 h-8 flex-shrink-0 rounded-full
                                            border border-[#1a2235]
                                            flex items-center justify-center
                                            group-hover:bg-red-600 group-hover:border-red-600
                                            transition-all duration-300 group-hover:rotate-[-42deg]
                                            self-center
                                        ">
                                                <svg className="w-3.5 h-3.5 stroke-slate-500 group-hover:stroke-white transition-colors duration-300" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}