import { useEffect,useState } from "react";
import { useAuth } from "@clerk/clerk-react";
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
    }
    )
    return (
        <div>
            <h1 className="text-3xl font-bold text-white">Events</h1>
            <div>
                {events.map(event => (
                    <div key={event.id} className="bg-gray-800 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold text-white">{event.companyname}</h2>
                        <p className="text-gray-300">{event.location}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}