import * as noteService from "../services/noteService.js";
import User from "../models/User.js";

export const createNote = async (req, res, next) => {
  try {
    const note = await noteService.createNote({
      ...req.body,
      owner: req.user._id,
    });
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req, res, next) => {
  try {
    const { search } = req.query;
    const notes = await noteService.getNotesByUser(req.user._id, search);
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const note = await noteService.getNoteById(req.params.id);
    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await noteService.updateNote(req.params.id, req.body);
    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const deletenote = async (req, res, next) => {
  try {
    const note = await noteService.deleteNote(req.params.id);
    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const addCollaborator = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const note = await noteService.addCollaborator(req.params.id, user._id);
    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const removeCollaborator = async (req, res, next) => {
  try {
    const note = await noteService.removeCollaborator(
      req.params.id,
      req.params.userId,
    );
    res.json(note);
  } catch (error) {
    next(error);
  }
};
