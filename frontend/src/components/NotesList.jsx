import { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api/notesApi";
import { useNavigate } from "react-router-dom";

// Decode JWT token to get logged-in user's _id
const getLoggedInUserId = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id; // matches what your backend signs: jwt.sign({ id: user._id })
  } catch {
    return null;
  }
};

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const loggedInUserId = getLoggedInUserId(); // 👈 decode once on render

  const fetchNotes = async () => {
    try {
      const res = await getNotes(search);
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

  const formatDate = (date) => new Date(date).toLocaleString();

  useEffect(() => {
    fetchNotes();
  }, [search]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Notes</h2>

      {notes.length === 0 && <p>No notes yet.</p>}

      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Search notes..."
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={fetchNotes}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="space-y-3">
        {notes.map((note) => {
          const isOwner = loggedInUserId === note.owner?._id; // 👈 compare IDs

          return (
            <div
              key={note._id}
              className="p-4 bg-white rounded-lg shadow border"
            >
              <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
              <div
                className="text-gray-600 mb-2 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
              <p className="text-sm text-gray-500">
                <span className="font-medium">Owner:</span>{" "}
                {note.owner?.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Collaborators:</span>{" "}
                {note.collaborators?.length > 0
                  ? note.collaborators.map((c) => c.name).join(", ")
                  : "None"}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Last updated: {formatDate(note.updatedAt)}
              </p>

              <div className="flex gap-3 mt-4">
                {/* Visible to everyone */}
                <button
                  onClick={() => navigate(`/edit-note/${note._id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                {/* Owner only */}
                {isOwner && (
                  <>
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
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NotesList;
