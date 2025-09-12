import { createUser } from "../controllers/userController";
import { getUserById } from "../controllers/userController";
import { authenticateUser } from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.post("/auth", authenticateUser);

export default router;
