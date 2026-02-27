const pool = require("../connection");
async function  handleEvent(req, res) {
    try {
        if (!req.auth) {
            return res.status(401).json({ error: "Unauthorized" });
        }
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
async function handleyourevents(req,res){
    try{
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        console.log("REQ.AUTH",req.auth)
        const userId = req.auth.userId;
        console.log("User ID:", userId)
        const events = await pool.query(
            `SELECT * FROM jobs WHERE clerk_user_id = $1`,[userId]
        )
        console.log("Your Events fetched successfully:", events.rows);
        res.status(200).json({ events: events.rows });
    }catch(err){
        console.error("Error fetching your events:", err);
        res.status(500).json({ error: "Failed to fetch your events" });
    }
}
module.exports = { handleEvent,handleyourevents }