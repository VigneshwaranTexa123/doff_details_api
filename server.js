import express from "express";
import machineRoutes from "./routes/machineRoutes.js";

const app = express();

app.use(express.json());

app.use("/machines_data", machineRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Server Run completely.....");
});