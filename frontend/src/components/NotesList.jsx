import { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api/notesApi";
import { useNavigate } from "react-router-dom";

const getLoggedInUserId = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id;
  } catch {
    return null;
  }
};

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  const loggedInUserId = getLoggedInUserId();

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
    <div className="p-6">
      {/* Modal */}
      {selectedNote && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
          onClick={() => setSelectedNote(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-[#034f72] mb-1">
              {selectedNote.title}
            </h2>
            <p className="text-xs text-gray-400 mb-4">
              Last updated: {formatDate(selectedNote.updatedAt)}
            </p>
            <div
              className="text-gray-600 text-sm leading-relaxed prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedNote.content }}
            />
            <div className="mt-6 pt-4 border-t border-blue-100">
              <p className="text-xs text-gray-500">
                <span className="font-medium text-gray-600">Owner:</span>{" "}
                {selectedNote.owner?.name || "Unknown"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium text-gray-600">
                  Collaborators:
                </span>{" "}
                {selectedNote.collaborators?.length > 0
                  ? selectedNote.collaborators.map((c) => c.name).join(", ")
                  : "None"}
              </p>
            </div>
            <button
              onClick={() => setSelectedNote(null)}
              className="mt-5 text-sm text-[#0286c3] font-medium hover:text-[#034f72] transition-colors duration-150"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold text-[#034f72] mb-6">Your Notes</h2>

      <div className="flex mb-6 gap-2">
        <input
          type="text"
          placeholder="Search notes..."
          className="border border-blue-200 p-2 px-4 rounded-2xl flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={fetchNotes}
          className="bg-[#019de4] text-white text-sm font-semibold px-5 py-2 rounded-2xl hover:bg-[#0377ad] transition-colors duration-150"
        >
          Search
        </button>
      </div>

      {notes.length === 0 && (
        <p className="text-gray-400 text-sm">No notes yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => {
          const isOwner = loggedInUserId === note.owner?._id;

          return (
            <div
              key={note._id}
              onClick={() => setSelectedNote(note)}
              className="bg-blue-50 border border-blue-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between cursor-pointer"
            >
              <h3 className="text-base font-bold text-[#034f72] mb-2 truncate">
                {note.title}
              </h3>
              <div
                className="text-gray-600 text-sm mb-3 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />
              <p className="text-xs text-gray-500">
                <span className="font-medium text-gray-600">Owner:</span>{" "}
                {note.owner?.name || "Unknown"}
              </p>
              <p className="text-xs text-gray-500">
                <span className="font-medium text-gray-600">
                  Collaborators:
                </span>{" "}
                {note.collaborators?.length > 0
                  ? note.collaborators.map((c) => c.name).join(", ")
                  : "None"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Last updated: {formatDate(note.updatedAt)}
              </p>

              <div
                className="flex flex-wrap gap-2 mt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => navigate(`/edit-note/${note._id}`)}
                  className="px-4 py-1.5 text-xs font-semibold bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-2xl hover:bg-yellow-200 transition-colors duration-150"
                >
                  Edit
                </button>

                {isOwner && (
                  <>
                    <button
                      onClick={() => navigate(`/collaborators/${note._id}`)}
                      className="px-4 py-1.5 text-xs font-semibold bg-purple-100 border border-purple-400 text-purple-700 rounded-2xl hover:bg-purple-200 transition-colors duration-150"
                    >
                      Manage Collaborators
                    </button>

                    <button
                      onClick={() => handleDelete(note._id)}
                      className="px-4 py-1.5 text-xs font-semibold bg-red-100 border border-red-400 text-red-500 rounded-2xl hover:bg-red-200 transition-colors duration-150"
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
