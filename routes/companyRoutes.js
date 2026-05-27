import express from "express";
import { getcompanys } from "../controllers/company_details.js";

const router = express.Router();

router.get("/", getcompanys);

export default router;