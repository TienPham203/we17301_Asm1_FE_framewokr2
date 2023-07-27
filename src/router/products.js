import express from "express";
import { create, getAll, get, remove, update } from "../controler/products";
// import { checkPermission } from "../miderwere/checkPermission";
const router = express.Router();

router.post("/products", create)
router.get("/products", getAll)
router.get("/products/:id", get)
router.delete("/products/:id", remove)
router.put("/products/:id", update)
export default router;