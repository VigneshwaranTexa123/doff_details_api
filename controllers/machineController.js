import db from "../config/db.js";

export const getMachines = (req, res) => {

  const { company_id } = req.body;

  
  if (!company_id) {
    return res.status(400).json({
      success: false,
      message: "company_id is required",
    });
  }

  const sql = `
    SELECT *
    FROM live_doff_details
    WHERE company_id = ?
  `;

  db.query(sql, [company_id], (err, result) => {


    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }


    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Machines Found",
      });
    }


    return res.status(200).json({
      success: true,
      data: result,
    });

  });
};