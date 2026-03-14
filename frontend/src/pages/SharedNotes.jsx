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

      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note._id} className="p-4 bg-white rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
            <div
              className="text-gray-600 mb-2 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
            <p className="text-sm text-gray-500">
              <span className="font-medium">Owner:</span>{" "}
              {note.owner?.name || "Unknown"}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Last updated: {formatDate(note.updatedAt)}
            </p>

            <div className="flex gap-3 mt-4">
              {/* Collaborators can edit but not delete or manage collaborators */}
              <button
                onClick={() => navigate(`/edit-note/${note._id}`)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
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
