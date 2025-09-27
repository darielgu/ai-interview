// Controller for all user-related operations
import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const saltRounds = 10;

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hash,
      },
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: "Failed to create user" });
    console.log(e);
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ error: "Failed to retrieve user" });
    console.log(e);
  }
};

// Authenticate user
export const authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user && (await bcrypt.compare(password, user.hash))) {
      res.status(200).json({ message: "Authentication successful", user });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (e) {
    res.status(500).json({ error: "Failed to authenticate user" });
    console.log(e);
  }
};
