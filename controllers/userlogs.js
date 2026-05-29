import db from "../config/db.js";

export const userLog = (req, res) => {
    console.log(req.body);
    console.log("DEVICE ID:", device_id);


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

    const checkSql = `
        SELECT id
        FROM user_log
        WHERE device_id = ? AND user_id = ? AND device_name = ? AND brand = ? 
        LIMIT 1
    `;

    db.query(checkSql, [device_id, user_id, device_name, brand], (checkErr, checkResult) => {

        if (checkErr) {
            return res.status(500).json({
                success: false,
                error: checkErr.message,
            });
        }

        if (checkResult.length > 0) {

            const updateSql = `
                UPDATE user_log
                SET
                    user_id = ?,
                    device_name = ?,
                    brand = ?,
                    device_version = ?,
                    version = ?,
                    login_time = ?,
                    logout_time = ?,
                    status = ?
                WHERE device_id = ?
            `;

            db.query(
                updateSql,
                [
                    user_id,
                    device_name,
                    brand,
                    device_version,
                    version,
                    login_time,
                    logout_time,
                    status ?? 1,
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
                    status ?? 1,
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
    });
};
