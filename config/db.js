import mysql from "mysql2";

const db = mysql.createPool({
  host: "3.111.67.90",
  user: "root",
  password: "TexaAdmin",
  database: "dharanithara_threadi",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Database Connection Failed");
    console.log(err);
  } else {
    console.log("MySQL Connected.....");
    connection.release();
  }
});

export default db;