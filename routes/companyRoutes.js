import express from "express";
import { companys } from "../controllers/company_details.js";

const router = express.Router();

router.post("/", companys);

export default router;