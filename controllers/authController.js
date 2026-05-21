import db from "../config/db.js";

export const loginUser = (req, res) => {

  const { user_name, password } = req.body;

  console.log("Username:", user_name);
  console.log("Password:", password);

  // Check all users first
  const sql = "SELECT * FROM user_details";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    console.log("All Users:", result);

    return res.json({
      success: true,
      data: result,
    });
  });
};