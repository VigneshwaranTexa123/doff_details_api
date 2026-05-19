import express from "express";
import machineRoutes from "./routes/machineRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/machines_data", machineRoutes);
app.use("/auth", authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Server Run completely.....");
});