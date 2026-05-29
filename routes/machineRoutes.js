import express from "express";
import { getMachines } from "../controllers/machineController.js";

const router = express.Router();

router.post("/", getMachines);

export default router;