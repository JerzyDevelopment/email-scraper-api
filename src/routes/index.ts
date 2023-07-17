import {Router} from "express";
import form from "../controllers";

const router = Router();

router.post("/:url", form.scrapeUrl);

export default router;
