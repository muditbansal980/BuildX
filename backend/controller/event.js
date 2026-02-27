const pool = require("../connection");
async function  handleEvent(req, res) {
    try {
        const events = await pool.query(
          `SELECT * FROM jobs`  
        )
        console.log("Events fetched successfully:", events.rows);
        res.status(200).json({ events: events.rows });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
}
module.exports = { handleEvent }