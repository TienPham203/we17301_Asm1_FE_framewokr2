import express from "express";
import { create, getAll, get, remove, update } from "../controler/products";
import { checkPermission } from "../miderwere/checkPermission";
const router = express.Router();

router.post("/products", checkPermission, create)
router.get("/products", getAll)
router.get("/products/:id", get)
router.delete("/products/:id", checkPermission, remove)
router.put("/products/:id", checkPermission, update)
export default router;