import { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api/notesApi";
import { useNavigate } from "react-router-dom";

function NotesList() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      console.error("Delete failed");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Notes</h2>

      {notes.length === 0 && <p>No notes yet.</p>}

      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note._id} className="p-4 bg-white rounded-lg shadow border">
            {/* Title */}
            <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
            {/* Content preview */}
            <div
              className="text-gray-600 mb-2 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
            {/* Owner */}
            <p className="text-sm text-gray-500">
              <span className="font-medium">Owner:</span>{" "}
              {note.owner?.name || "Unknown"}
            </p>
            {/* Collaborators */}
            <p className="text-sm text-gray-500">
              <span className="font-medium">Collaborators:</span>{" "}
              {note.collaborators && note.collaborators.length > 0
                ? note.collaborators.map((c) => c.name).join(", ")
                : "None"}
            </p>
            {/* Last updated */}
            <p className="text-sm text-gray-400 mt-1">
              Last updated: {formatDate(note.updatedAt)}
            </p>
            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => navigate(`/edit-note/${note._id}`)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => navigate(`/collaborators/${note._id}`)}
                className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Manage Collaborators
              </button>
              <button
                onClick={() => handleDelete(note._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;
