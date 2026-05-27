import express from "express";
import machineRoutes from "./routes/machineRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userLogRoutes from "./routes/userlogRoutes.js";
import versionRoutes from "./routes/versionRoutes.js";
import companyRoutes from "./routes/companyRoutes.js"

const app = express();

app.use(express.json());

app.use("/machines_data", machineRoutes);
app.use("/companys",companyRoutes)
app.use("/auth", authRoutes);
app.use("/userlog", userLogRoutes);
app.use("/version", versionRoutes)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});