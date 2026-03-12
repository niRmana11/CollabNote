import { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api/notesApi";

function NotesList() {
  const [notes, setNotes] = useState([]);

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

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Notes</h2>

      {notes.length === 0 && <p>No notes yet.</p>}

      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note._id}
            className="p-4 bg-white rounded shadow flex justify-between"
          >
            <div>
              <h3 className="font-semibold">{note.title}</h3>
              <p className="text-gray-600">{note.content}</p>
            </div>

            <button
              onClick={() => handleDelete(note._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;
