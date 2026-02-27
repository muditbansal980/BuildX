import {useState} from "react"
import { Link } from "react-router-dom"
export default function Sidebar(props) {
    const [display, setDisplay] = useState("hidden");
    const navItems = [
        {
            label: "Events",
            to: "/events",
            icon: (
                <svg className="w-5 h-5" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
            ),
        },
        {
            label: "Create Event",
            to: "/admin",
            icon: (
                <svg className="w-5 h-5" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" />
                </svg>
            ),
        },
        {
            label: "Your Events",
            to: "/your-events",
            icon: (
                <svg className="w-5 h-5" fill="none" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M4 21v-1a8 8 0 0116 0v1" />
                </svg>
            ),
        },
    ]

    return (
        <aside className={`
            w-[240px] min-h-screen flex-shrink-0
            bg-[#07090d] border-r border-[#111827]
            
            absolute overflow-hidden

        `}>
            {/* Ambient red glow */}
            <div className="absolute -top-24 -left-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Logo / Brand area */}
            <div className="px-6 py-6 border-b border-[#111827]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 stroke-red-400" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <span className="text-slate-100 font-extrabold tracking-tight text-base cursor-pointer"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                        onClick={() => setDisplay(display === "hidden" ? "block" : "hidden")}>
                        Sidebar
                    </span>
                </div>
            </div>

            {/* Nav section */}
            <div className="flex-1 px-3 py-5 relative z-10">
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-600 px-3 mb-3">
                    Navigation
                </p>

                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="
                                group flex items-center gap-3
                                px-3 py-2.5 rounded-xl
                                text-slate-400 hover:text-slate-100
                                hover:bg-[#0d1117]
                                border border-transparent hover:border-[#1a2235]
                                transition-all duration-200
                                relative overflow-hidden
                            "
                        >
                            {/* Hover red left accent bar */}
                            <span className="
                                absolute left-0 top-1/2 -translate-y-1/2
                                w-0.5 h-0 rounded-full bg-red-500
                                group-hover:h-5
                                transition-all duration-300
                            " />

                            {/* Icon */}
                            <span className="
                                stroke-slate-500 group-hover:stroke-red-400
                                transition-colors duration-200 flex-shrink-0
                            ">
                                {item.icon}
                            </span>

                            {/* Label */}
                            <span className="text-sm font-medium tracking-tight">
                                {item.label}
                            </span>

                            {/* Arrow */}
                            <svg
                                className="w-3.5 h-3.5 stroke-slate-700 group-hover:stroke-slate-500 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-200"
                                fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    )
}