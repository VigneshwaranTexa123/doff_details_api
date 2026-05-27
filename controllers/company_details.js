import db from "../config/db.js";

export const getcompanys = (req, res) => {
  const sql = "SELECT * FROM company_details";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.json({
      success: true,
      data: result,
    });
  });
};