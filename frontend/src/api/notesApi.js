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
