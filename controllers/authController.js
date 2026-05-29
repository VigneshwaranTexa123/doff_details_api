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
      AND status = 1
      LIMIT 1
    `;

    db.query(sql, [user_name, password], (err, result) => {

      if (err) {

        console.log("DATABASE ERROR :", err);

        return res.status(500).json({
          success: false,
          message: "DB not Connected. Contact Support",
          error: err.code || err.message,
        });
      }

      // INVALID LOGIN
      if (result.length === 0) {

        return res.status(401).json({
          success: false,
          message: "Invalid Username and Password",
        });
      }

      const user = result[0];

      // COMPANY ID VALIDATION
      if (
        user.company_id === null ||
        user.company_id === 0 ||
        user.company_id === "0"
      ) {

        return res.status(403).json({
          success: false,
          message: "Company ID not assigned. Contact Admin",
        });
      }

      // LOGIN SUCCESS
      return res.status(200).json({
        success: true,
        message: "Login Successfully",
        user: {
          id: user.id,
          unique_id: user.id,
          user_name: user.user_name,
          company_id: user.company_id,
          status: user.status,
        },
      });
    });

  } catch (error) {

    console.log("LOGIN API ERROR :", error);

    return res.status(500).json({
      success: false,
      message: "Server Error. Please Try Again Later",
    });
  }
};