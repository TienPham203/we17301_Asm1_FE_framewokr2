import express from "express";
import { create, getAll, get, remove, update } from "../controler/category";
import { checkPermission } from "../miderwere/checkPermission";

const router = express.Router();

router.post("/category", checkPermission, create)
router.get("/category", getAll)
router.get("/category/:id", get)
router.delete("/category/:id", checkPermission, remove)
router.put("/category/:id", checkPermission, update)
export default router;