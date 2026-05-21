import db from "../config/db.js";

export const loginUser = (req, res) => {

  const { user_name, password } = req.body;

  // Validation
  if (!user_name || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and Password are required",
    });
  }

  const sql = `
    SELECT id, user_name, status
    FROM user_details
    WHERE user_name = ?
    AND password = ?
    AND status = 1
  `;

  db.query(sql, [user_name, password], (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        id: result[0].id,
        user_name: result[0].user_name,
        status: result[0].status,
      },
    });
  });
};