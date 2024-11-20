import express from "express";
import { deleteProducts, getProducts, postProducts, putProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", postProducts);

router.put("/:id", putProducts)

router.delete("/:id", deleteProducts)

export default router;