import db from "../config/db.js";

export const companys = (req, res) => {
  const { unique_id } = req.body;


  if (!unique_id) {
    return res.status(400).json({
      success: false,
      message: "unique_id is required",
    });
  }

  const sql = `
    SELECT 
      company_name,
      company_address,
      allow_login,
      status
    FROM company_details
    WHERE unique_id = ?
  `;

  db.query(sql, [unique_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    // No data found
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result[0],
    });
  });
};