import express from "express";
import * as noteController from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", noteController.createNote);
router.get("/", noteController.getNotes);
router.get("/:id", noteController.getNote);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deletenote);
router.post("/:id/collaborators", noteController.addCollaborator);
router.delete("/:id/collaborators/:userId", noteController.removeCollaborator);

export default router;
