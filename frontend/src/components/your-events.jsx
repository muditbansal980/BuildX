import { useState, useEffect } from "react"
import { useAuth } from "@clerk/clerk-react"

export default function Events() {
    const [events, setEvents] = useState([]);
    const { getToken } = useAuth()
    
    useEffect(() => {
        async function fetchEvents() {
            try {
                const token = await getToken()
                const res = await fetch("http://localhost:4009/events/your-events", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await res.json();
                setEvents(data.events);
            } catch (err) {
                console.error("Error fetching events:", err);
            }
        }
        fetchEvents();
    }, [])

    return (
        <>
        </>
    )
}