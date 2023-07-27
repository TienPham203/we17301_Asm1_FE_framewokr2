import express from "express";
import { create, getAll, get, remove, update } from "../../../controler/category";
import { checkPermission } from "../../miderwere/checkPermission";

const router = express.Router();

router.post("/category", create)
router.get("/category", getAll)
router.get("/category/:id", get)
router.delete("/category/:id", remove)
router.put("/category/:id", update)
export default router;