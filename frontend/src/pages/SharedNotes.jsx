import { useEffect, useState } from "react";
import { getSharedNotes } from "../api/notesApi";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

function SharedNotes() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getSharedNotes();
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch shared notes");
    }
  };

  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <DashboardLayout>
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

      <h1 className="text-2xl font-bold text-[#034f72] mb-6">Shared Notes</h1>

      {notes.length === 0 && (
        <p className="text-gray-400 text-sm">
          No notes have been shared with you yet.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
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
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-600">Owner:</span>{" "}
              {note.owner?.name || "Unknown"}
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
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default SharedNotes;
