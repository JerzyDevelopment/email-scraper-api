import { Router } from "express";
import form from "../controllers";

const router = Router();


router.get("/:url", form.scrapeUrl);

export default router;
