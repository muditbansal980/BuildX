import { useState } from "react"
import Sidebar from "./sidebar"

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            {/* ── Sidebar overlay (mobile) ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── Sliding Sidebar ── */}
            <div
                className={`
                    fixed top-0 left-0 h-full w-[240px] z-40
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* ── Navbar ── */}
            <header className={`
                h-[60px] flex-shrink-0
                bg-[#07090d] border-b border-[#111827]
                flex items-center px-5 gap-4
                sticky top-0 z-20
                relative overflow-hidden
                transition-all duration-300 ease-in-out
                ${sidebarOpen ? "w-[calc(100%-240px)] ml-[240px]" : "w-full"}
            `}>
                {/* Subtle ambient glow */}
                <div className="absolute -top-10 left-10 w-48 h-24 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* ── Toggle button ── */}
                <button
                    onClick={() => setSidebarOpen(prev => !prev)}
                    aria-label="Toggle sidebar"
                    className="
                        relative z-10 w-9 h-9 flex-shrink-0
                        flex flex-col items-center justify-center gap-[5px]
                        rounded-xl border border-[#1a2235]
                        bg-[#0d1117] hover:bg-[#111827]
                        hover:border-red-500/35
                        transition-all duration-200 group
                        cursor-pointer
                    "
                >
                    {/* Three-bar hamburger → X morph */}
                    <span className={`
                        block h-px w-4 bg-slate-400 rounded-full
                        transition-all duration-300 origin-center
                        ${sidebarOpen ? "rotate-45 translate-y-[6px] bg-red-400" : ""}
                        group-hover:bg-slate-200
                    `} />
                    <span className={`
                        block h-px w-4 bg-slate-400 rounded-full
                        transition-all duration-300
                        ${sidebarOpen ? "opacity-0 scale-x-0" : ""}
                        group-hover:bg-slate-200
                    `} />
                    <span className={`
                        block h-px w-4 bg-slate-400 rounded-full
                        transition-all duration-300 origin-center
                        ${sidebarOpen ? "-rotate-45 -translate-y-[6px] bg-red-400" : ""}
                        group-hover:bg-slate-200
                    `} />
                </button>

                {/* ── Brand ── */}
                <div className="relative z-10 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 stroke-red-400" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <span
                        className="text-slate-100 font-extrabold tracking-tight text-base"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                        HireSpace
                    </span>
                </div>

                {/* ── Spacer ── */}
                <div className="flex-1" />

                {/* ── Right side actions ── */}
                <div className="relative z-10 flex items-center gap-3">

                    {/* Notification bell */}
                    <button className="
                        w-9 h-9 rounded-xl border border-[#1a2235]
                        bg-[#0d1117] hover:bg-[#111827]
                        hover:border-red-500/35
                        flex items-center justify-center
                        transition-all duration-200 group
                    ">
                        <svg className="w-4 h-4 stroke-slate-500 group-hover:stroke-slate-200 transition-colors duration-200" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
                        </svg>
                    </button>

                    {/* Divider */}
                    <div className="h-5 w-px bg-[#1a2235]" />

                    {/* Avatar / User button slot */}
                    <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/25 flex items-center justify-center cursor-pointer hover:bg-red-600/30 hover:border-red-500/45 transition-all duration-200">
                        <svg className="w-4 h-4 stroke-red-400" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <circle cx="12" cy="7" r="4" />
                            <path d="M4 21v-1a8 8 0 0116 0v1" />
                        </svg>
                    </div>

                </div>
            </header>

            {/* ── Page shift wrapper — pushes content right when sidebar opens ── */}
            {/* Wrap your page content in this div, or handle shift at layout level */}
            {/*
            <div className={`transition-all duration-300 ${sidebarOpen ? "ml-[240px]" : "ml-0"}`}>
                ... page content ...
            </div>
            */}
        </>
    )
}