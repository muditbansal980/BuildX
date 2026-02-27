const pool = require("../connection");

async function handleuser(req, res) {
    console.log("✅ /role route HIT");
    console.log("auth:", req.auth);
    console.log("body:", req.body);
    try {
        console.log("req.auth:", req.auth);
        console.log("body:", req.body);

        const clerkUserId = req.auth?.userId;
        if (!clerkUserId) return res.status(401).json({ ok: false, message: "Unauthorized" });

        const { username, email } = req.body;

        const result = await pool.query(
            `
      INSERT INTO users (clerk_user_id, username, email)
      VALUES ($1, $2, $3)
      ON CONFLICT (clerk_user_id)
      DO UPDATE SET
        username = COALESCE(EXCLUDED.username, users.username),
        email = COALESCE(EXCLUDED.email, users.email)
      RETURNING *;
      `,
            [clerkUserId, username, email]
        );

        return res.json({ ok: true, user: result.rows[0] });
    } catch (err) {
        console.log("DB ERROR:", err.code, err.message);
        if (err.code === "23505") {
            return res.status(409).json({ ok: false, message: "Duplicate key (username/email already exists)" });
        }
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}

async function handlecandidate(req,res){
    try{
        const clerkUserId = req.auth?.userId;
        if (!clerkUserId) return res.status(401).json({ ok: false, message: "Unauthorized" });
        const {role} = req.body
        const result = await pool.query(
            `
            UPDATE users
            SET role = $1
            WHERE clerk_user_id = $2
            RETURNING *;
            `,
            [role, clerkUserId]
        );
        return res.status(200).json({ ok: true, user: result.rows[0] });
    }catch(err){
        console.log("DB ERROR:", err.code, err.message);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}

async function handlecompany(req,res){
    try{
        const clerkUserId = req.auth?.userId;
        if (!clerkUserId) return res.status(401).json({ ok: false, message: "Unauthorized" });
        const {role} = req.body
        const result = await pool.query(
            `
            UPDATE users
            SET role = $1
            WHERE clerk_user_id = $2
            RETURNING *;
            `,
            [role, clerkUserId]
        );
        return res.status(200).json({ ok: true, user: result.rows[0] });
    }catch(err){
        console.log("DB ERROR:", err.code, err.message);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}

async function getUserRole(req, res) {
    try {
        const clerkUserId = req.auth?.userId;
        if (!clerkUserId) return res.status(401).json({ ok: false, message: "Unauthorized" });
        
        const result = await pool.query(
            `SELECT id, clerk_user_id, username, email, role FROM users WHERE clerk_user_id = $1`,
            [clerkUserId]
        );
        
        if (result.rows.length === 0) {
            return res.json({ ok: true, user: null }); // User doesn't exist yet
        }
        
        return res.json({ ok: true, user: result.rows[0] });
    } catch (err) {
        console.log("DB ERROR:", err.code, err.message);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}

module.exports = { handleuser, handlecandidate, handlecompany, getUserRole };