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

    // ✅ CHECK USER + DEVICE
    const checkSql = `
        SELECT id
        FROM user_log
        WHERE user_id = ?
        AND device_id = ?
        LIMIT 1
    `;

    db.query(
        checkSql,
        [user_id, device_id],
        (checkErr, checkResult) => {

            if (checkErr) {
                return res.status(500).json({
                    success: false,
                    error: checkErr.message,
                });
            }

            // ✅ DEVICE EXISTS -> UPDATE
            if (checkResult.length > 0) {

                const updateSql = `
                    UPDATE user_log
                    SET
                        device_name = ?,
                        brand = ?,
                        device_version = ?,
                        version = ?,
                        login_time = ?,
                        logout_time = ?,
                        status = ?
                    WHERE user_id = ?
                    AND device_id = ?
                `;

                db.query(
                    updateSql,
                    [
                        device_name,
                        brand,
                        device_version,
                        version,
                        login_time,
                        logout_time,
                        status || 1,
                        user_id,
                        device_id
                    ],
                    (updateErr) => {

                        if (updateErr) {
                            return res.status(500).json({
                                success: false,
                                error: updateErr.message,
                            });
                        }

                        return res.status(200).json({
                            success: true,
                            message: "User Log Updated Successfully",
                        });
                    }
                );

            } else {

                // ✅ NEW INSERT
                const insertSql = `
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
                    insertSql,
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
                    (insertErr, result) => {

                        if (insertErr) {
                            return res.status(500).json({
                                success: false,
                                error: insertErr.message,
                            });
                        }

                        return res.status(200).json({
                            success: true,
                            message: "User Log Added Successfully",
                            log_id: result.insertId,
                        });
                    }
                );
            }
        }
    );
};

