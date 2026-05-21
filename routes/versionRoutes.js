import express from "express";
import { getVersionControl } from "../controllers/versionController.js";

const router = express.Router();

router.get("/fetchVersion", getVersionControl);

export default router;