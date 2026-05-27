import db from "../config/db.js";

export const userLog = (req, res) => {

    const {
        user_id,
        device_id,
        device_name,
        brand,
        device_version,
        status,
        version,
        login_time,
        logout_time
    } = req.body;

    if (
        !user_id ||
        !device_id ||
        !device_name ||
        !brand ||
        !device_version ||
        !version ||
        !login_time ||
        !logout_time
    ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    const sql = `
        INSERT INTO user_log
        (
            user_id,
            device_id,
            device_name,
            brand,
            device_version,
            status,
            version,
            login_time,
            logout_time
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id,
            device_id,
            device_name,
            brand,
            device_version,
            status || 1,   
            version,
            login_time,
            logout_time
        ],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    success: false,
                    error: err.message,
                });
            }

            return res.status(200).json({
                success: true,
                message: "User Log Added Successfully",
                log_id: result.insertId,
            });
        }
    );
};