import { Link } from "react-router-dom"
import { SignedIn, SignedOut, UserButton, useUser, useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Home() {
    const { getToken, isSignedIn } = useAuth()
    const { user } = useUser()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [hasRole, setHasRole] = useState(false)
    
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
        async function checkUserRole() {
            if (!isSignedIn) {
                setLoading(false)
                return
            }
            
            try {
                const token = await getToken()
                const res = await fetch("http://localhost:4009/role/profile", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    method: "GET",
                })
                const data = await res.json()
                
                // If user exists and has a role, redirect
                if (data.ok && data.user && data.user.role) {
                    console.log("User has role:", data.user.role)
                    setHasRole(true)
                    
                    if (data.user.role === "company") {
                        navigate("/admin")
                    } else if (data.user.role === "candidate") {
                        navigate("/events")
                    }
                } else {
                    // User doesn't exist or has no role yet - create user
                    console.log("No role found, creating user")
                    await UserUpload()
                    setHasRole(false)
                }
            } catch (err) {
                console.error("Error checking user role:", err)
                setHasRole(false)
            } finally {
                setLoading(false)
            }
        }
        
        checkUserRole()
    }, [isSignedIn])

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

                * { box-sizing: border-box; }

                .home-root {
                    font-family: 'DM Sans', sans-serif;
                    width: 100vw;
                    min-height: 100vh;
                    background: #07090d;
                    display: flex;
                    position: relative;
                    overflow: hidden;
                }

                /* Ambient glow blobs */
                .blob {
                    position: absolute;
                    border-radius: 50%;
                    pointer-events: none;
                    filter: blur(80px);
                }
                .blob-1 {
                    width: 500px; height: 500px;
                    top: -140px; right: -60px;
                    background: radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%);
                }
                .blob-2 {
                    width: 340px; height: 340px;
                    bottom: -80px; left: 80px;
                    background: radial-gradient(circle, rgba(220,38,38,0.09) 0%, transparent 70%);
                }

                /* Subtle dot-grid texture */
                .grid-overlay {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px);
                    background-size: 28px 28px;
                }

                /* ─── Sidebar slot ─────────────────────────────────
                   When you add a sidebar, replace width: 0 with 260px
                   and uncomment border-right.
                ─────────────────────────────────────────────────── */
                .sidebar-slot {
                    width: 0;
                    min-height: 100vh;
                    flex-shrink: 0;
                    /* width: 260px; */
                    /* border-right: 1px solid #111827; */
                    transition: width 0.3s ease;
                }

                /* ─── Main ─────────────────────────────────────── */
                .main-content {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 48px 32px;
                    position: relative;
                    z-index: 1;
                }

                .card-container {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    max-width: 700px;
                    width: 100%;
                    animation: fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(32px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Eyebrow label */
                .eyebrow {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #ef4444;
                    margin-bottom: 16px;
                }
                .eyebrow-line {
                    width: 28px;
                    height: 1.5px;
                    background: #ef4444;
                    border-radius: 2px;
                }

                /* Heading */
                .heading {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(2.2rem, 5vw, 3.6rem);
                    font-weight: 800;
                    color: #f1f5f9;
                    line-height: 1.08;
                    margin-bottom: 12px;
                    letter-spacing: -0.025em;
                }
                .heading-accent { color: #ef4444; }

                .subtext {
                    font-size: 15px;
                    color: #64748b;
                    font-weight: 300;
                    margin-bottom: 52px;
                    line-height: 1.7;
                }

                /* ─── Role cards ─────────────────────────────────── */
                .role-cards {
                    display: flex;
                    gap: 18px;
                    flex-wrap: wrap;
                    width: 100%;
                }

                .role-card {
                    flex: 1;
                    min-width: 220px;
                    background: #0d1117;
                    border: 1px solid #1a2235;
                    border-radius: 18px;
                    padding: 30px 26px 68px;   /* bottom padding for arrow */
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: border-color 0.28s, transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s;
                    animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both;
                }
                .role-card:nth-child(2) { animation-delay: 0.1s; }

                /* Red gradient wash on hover */
                .role-card::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(145deg, rgba(239,68,68,0.07) 0%, transparent 55%);
                    opacity: 0;
                    transition: opacity 0.3s;
                    pointer-events: none;
                }
                .role-card:hover::after { opacity: 1; }

                .role-card:hover {
                    border-color: rgba(239,68,68,0.45);
                    transform: translateY(-6px);
                    box-shadow:
                        0 24px 64px -16px rgba(239,68,68,0.2),
                        0 0 0 1px rgba(239,68,68,0.08);
                }
                .role-card:active {
                    transform: translateY(-2px) scale(0.985);
                    transition-duration: 0.1s;
                }

                /* Icon */
                .card-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 13px;
                    background: rgba(239,68,68,0.08);
                    border: 1px solid rgba(239,68,68,0.18);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 22px;
                    transition: background 0.28s, border-color 0.28s, transform 0.28s;
                }
                .role-card:hover .card-icon {
                    background: rgba(239,68,68,0.16);
                    border-color: rgba(239,68,68,0.38);
                    transform: scale(1.08);
                }
                .card-icon svg {
                    width: 22px; height: 22px;
                    stroke: #ef4444;
                    fill: none;
                    stroke-width: 1.75;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }

                .card-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #f1f5f9;
                    margin-bottom: 8px;
                    letter-spacing: -0.01em;
                }

                .card-desc {
                    font-size: 13.5px;
                    color: #475569;
                    line-height: 1.65;
                    font-weight: 300;
                }

                /* Bottom-right arrow pill */
                .card-arrow {
                    position: absolute;
                    bottom: 22px;
                    right: 22px;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 1px solid #1a2235;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.28s, border-color 0.28s, transform 0.3s;
                }
                .card-arrow svg {
                    width: 14px; height: 14px;
                    stroke: #475569;
                    fill: none;
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    transition: stroke 0.28s;
                }
                .role-card:hover .card-arrow {
                    background: #ef4444;
                    border-color: #ef4444;
                    transform: rotate(-42deg);
                }
                .role-card:hover .card-arrow svg { stroke: #fff; }

                /* ─── Footer strip ──────────────────────────────── */
                .footer-strip {
                    margin-top: 44px;
                    padding-top: 24px;
                    border-top: 1px solid #111827;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .footer-note {
                    font-size: 12.5px;
                    color: #334155;
                    font-weight: 300;
                }
                .footer-note strong {
                    color: #475569;
                    font-weight: 500;
                }
                .footer-tag {
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #1e293b;
                }
            `}</style>

            <div className="home-root">
                {/* Visual effects */}
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="grid-overlay" />

                {/* ── Drop your <Sidebar /> component here ──────── */}
                <div className="sidebar-slot" id="sidebar-slot" />

                <main className="main-content">
                    <div className="card-container">

                        {loading ? (
                            <div style={{ color: '#f1f5f9', fontSize: '18px', textAlign: 'center' }}>
                                <div style={{ marginBottom: '20px' }}>Loading your profile...</div>
                                <div style={{ opacity: 0.7, fontSize: '14px' }}>Please wait while we check your account</div>
                            </div>
                        ) : !hasRole ? (
                            <>
                                <div className="eyebrow">
                                    <span className="eyebrow-line" />
                                    Get started
                                </div>

                                <h1 className="heading">
                                    Who are<br />
                                    you <span className="heading-accent">today?</span>
                                </h1>

                                <p className="subtext">
                                    Select your role to personalise your experience.<br />
                                    You can always switch it later from settings.
                                </p>

                                <div className="role-cards">

                            {/* ── Company ── */}
                            <div className="role-card" onClick={CompanyRole}>
                                <div className="card-icon">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
                                    </svg>
                                </div>
                                <div className="card-title">Company</div>
                                <div className="card-desc">
                                    Post jobs, manage applicants,<br />and build your hiring pipeline.
                                </div>
                                <div className="card-arrow">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </div>
                            </div>

                            {/* ── Candidate ── */}
                            <div className="role-card" onClick={CandidateRole}>
                                <div className="card-icon">
                                    <svg viewBox="0 0 24 24">
                                        <circle cx="12" cy="7" r="4"/>
                                        <path d="M4 21v-1a8 8 0 0116 0v1"/>
                                    </svg>
                                </div>
                                <div className="card-title">Candidate</div>
                                <div className="card-desc">
                                    Browse opportunities, apply,<br />and track your applications.
                                </div>
                                <div className="card-arrow">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                    </svg>
                                </div>
                            </div>

                        </div>

                                <div className="footer-strip">
                                    <p className="footer-note">
                                        Signed in as&nbsp;
                                        <strong>
                                            {user?.primaryEmailAddress?.emailAddress || user?.username || "—"}
                                        </strong>
                                    </p>
                                    <span className="footer-tag">Step 1 of 1</span>
                                </div>
                            </>
                        ) : null}

                    </div>
                </main>
            </div>
        </>
    )
}