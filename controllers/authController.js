import db from "../config/db.js";

export const loginUser = (req, res) => {
  try {
    const user_name = req.body.user_name?.trim();
    const password = req.body.password?.trim();

    if (!user_name || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required",
      });
    }

    const sql = `
      SELECT id, user_name, company_id, status
      FROM user_details
      WHERE user_name = ?
      AND password = ?
      LIMIT 1
    `;

    db.query(sql, [user_name, password], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "DB Error. Contact Support",
        });
      }

      if (!result || result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid Username and Password",
        });
      }

      const user = result[0];

      // STATUS CHECK
      if (parseInt(user.status, 10) !== 1) {
        return res.status(403).json({
          success: false,
          message: "Your permission denied",
        });
      }

      // COMPANY CHECK
      if (!user.company_id || Number(user.company_id) === 0) {
        return res.status(403).json({
          success: false,
          message: "Company ID not assigned. Contact Admin",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Login Successfully",
        user: {
          id: user.id,
          user_name: user.user_name,
          company_id: user.company_id,
          status: user.status,
        },
      });
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};