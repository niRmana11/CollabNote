import axiosClient from "./axiosClient";

export const getNotes = () => {
  return axiosClient.get("/notes");
};

export const createNote = (note) => {
  return axiosClient.post("/notes", note);
};

export const deleteNote = (id) => {
  return axiosClient.delete(`/notes/${id}`);
};

export const getNoteById = (id) => {
  return axiosClient.get(`/notes/${id}`);
};

export const updateNote = (id, data) => {
  return axiosClient.put(`/notes/${id}`, data);
};

export const addCollaborator = (id, data) => {
  return axiosClient.post(`/notes/${id}/collaborators`, data);
};

export const removeCollaborator = (id, userId) => {
  return axiosClient.delete(`/notes/${id}/collaborators/${userId}`);
};
