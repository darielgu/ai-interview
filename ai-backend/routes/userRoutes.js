import { createUser } from "../controllers/userController.js";
import { getUserById } from "../controllers/userController.js";
import { authenticateUser } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.post("/auth", authenticateUser);

export default router;
