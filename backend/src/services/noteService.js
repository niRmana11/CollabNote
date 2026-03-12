import Note from "../models/Note.js";

export const createNote = async ({ title, content, owner }) => {
  return await Note.create({ title, content, owner });
};

// for testing in postman
export const getNotes = async (search) => {
  const query = search ? { $text: { $search: search } } : {};

  return await Note.find(query);
};

export const getNotesByUser = async (userId, search = "") => {
  const filter = {
    isDeleted: false,
    $or: [{ owner: userId }, { collaboraters: userId }],
  };

  if (search) filter.$text = { $search: search };

  return await Note.find(filter)
    .populate("owner", "name email")
    .populate("collaborators", "name email")
    .sort({ updatedAt: -1 });
};

export const getNoteById = async (noteId) => {
  return await Note.findById(noteId)
    .populate("owner", "name email")
    .populate("collaborators", "name email");
};

export const updateNote = async (noteId, data) => {
  return await Note.findByIdAndUpdate(noteId, data, { new: true });
};

export const deleteNote = async (noteId) => {
  return await Note.findByIdAndUpdate(
    noteId,
    { isDeleted: true },
    { new: true },
  );
};

export const addCollaborator = async (noteId, userId) => {
  return await Note.findByIdAndUpdate(
    noteId,
    { $addToSet: { collaborators: userId } },
    { new: true },
  );
};

export const removeCollaborator = async (noteId, userId) => {
  return await Note.findByIdAndUpdate(
    noteId,
    { $pull: { collaborators: userId } },
    { new: true },
  );
};
