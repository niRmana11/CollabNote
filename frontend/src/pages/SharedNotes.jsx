import { useEffect, useState } from "react";
import { getSharedNotes } from "../api/notesApi";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

function SharedNotes() {
  const [notes, setNotes] = useState([]);
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
      <h1 className="text-2xl font-bold mb-6">Shared Notes</h1>

      {notes.length === 0 && (
        <p className="text-gray-500">No notes have been shared with you yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-blue-50 border border-blue-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
          >
            <h3 className="text-base font-bold text-[#034f72] mb-2 truncate">
              {note.title}
            </h3>
            <div
              className="text-gray-600 text-sm mb-3 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-500">Owner:</span>{" "}
              {note.owner?.name || "Unknown"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Last updated: {formatDate(note.updatedAt)}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {/* Collaborators can edit but not delete or manage collaborators */}
              <button
                onClick={() => navigate(`/edit-note/${note._id}`)}
                className="px-4 py-1.5 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-2xl hover:bg-yellow-200 transition-colors duration-150"
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
