import db from "../config/db.js";

export const userLog = (req, res) => {

    try {

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

        console.log(req.body);

        const checkSql = `
            SELECT id
            FROM user_log
            WHERE user_id = ? AND device_id = ?
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

                // UPDATE
                if (checkResult.length > 0) {

                    const updateSql = `
                        UPDATE user_log
                        SET
                            login_time = ?,
                            logout_time = ?
                        WHERE user_id = ?
                        AND device_id = ?
                    `;

                    db.query(
                        updateSql,
                        [
                            login_time,
                            logout_time,
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
                                message: "Updated Successfully",
                            });
                        }
                    );

                } else {

                    // INSERT
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
                                message: "Inserted Successfully",
                                log_id: result.insertId,
                            });
                        }
                    );
                }
            }
        );

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};