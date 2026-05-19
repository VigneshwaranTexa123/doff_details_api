import db from "../config/db.js";

export const getMachines = (req, res) => {
  const sql = "SELECT * FROM live_doff_details";

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