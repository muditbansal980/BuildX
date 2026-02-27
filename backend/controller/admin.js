const pool = require("../connection");

async function handlejob(req, res) {
    try {
        console.log("req.auth:", req.auth);
        console.log("body:", req.body);
        const clerkUserId = req.auth?.userId;
        if (!clerkUserId) return res.status(401).json({ ok: false, message: "Unauthorized" });
        const {jobRole, jobDescription, companyName, location, salary} = req.body   
        const result = await pool.query(
            `
            INSERT INTO jobs (clerk_user_id, jobrole, jobdescription, companyname, location, salary)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
            `,
            [clerkUserId, jobRole, jobDescription, companyName, location, salary]
        );
        return res.json({ ok: true, job: result.rows[0] });
    }
    catch(err){
        console.log("Error in handlejob:", err);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}
module.exports = { handlejob };