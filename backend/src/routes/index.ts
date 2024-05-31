import { Router } from "express";
import githubRoutes from "./githubRoutes";

const router = Router();

router.use("/github", githubRoutes);

export = router;
