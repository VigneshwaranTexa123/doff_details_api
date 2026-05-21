import db from "../config/db.js";

export const getVersionControl = (req, res) => {

    const sql = `
        SELECT 
            id,
            app_name,
            version,
            status,
            remarks,
            created_at,
            updated_at
        FROM version_control
        WHERE status = 1
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                error: err.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Version Control Fetch Successfully",
            data: result,
        });
    });
};