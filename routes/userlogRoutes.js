import express from "express";
import { userLog } from "../controllers/userlogs.js";

const router = express.Router();

router.post("/fetchDevice", userLog);

export default router;