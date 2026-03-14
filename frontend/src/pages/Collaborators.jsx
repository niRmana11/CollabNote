import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  getNoteById,
  addCollaborator,
  removeCollaborator,
} from "../api/notesApi";

function Collaborators() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [email, setEmail] = useState("");

  const fetchNote = async () => {
    try {
      const res = await getNoteById(id);
      setNote(res.data);
    } catch (err) {
      console.error("Failed to fetch note");
    }
  };

  const handleAdd = async () => {
    try {
      await addCollaborator(id, { email });
      setEmail("");
      fetchNote();
    } catch (err) {
      console.error("Add collaborator failed");
    }
  };

  const handleRemove = async (userId) => {
    try {
      await removeCollaborator(id, userId);
      fetchNote();
    } catch (err) {
      console.error("Remove failed");
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  if (!note)
    return (
      <p className="text-center mt-10 text-sm text-gray-400">Loading...</p>
    );

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10">
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-xl bg-white border border-blue-100 p-6 rounded-3xl shadow-sm">
          {/* Back button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 text-sm text-[#0286c3] font-medium hover:text-[#034f72] mb-5 transition-colors duration-150"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <h2 className="text-xl font-bold mb-4">Manage Collaborators</h2>

          {/* Add collaborator */}
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              placeholder="User Email"
              className="border border-blue-200 bg-blue-50 p-2 px-4 flex-1 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleAdd}
              className="bg-[#15a8ed] text-white text-sm font-semibold px-5 py-2 rounded-2xl hover:bg-[#0484c0] transition-colors duration-150"
            >
              Add
            </button>
          </div>

          {/* Collaborator list */}
          <ul className="space-y-2">
            {note.collaborators.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center border border-blue-100 bg-blue-50 px-4 py-2 rounded-2xl"
              >
                <span className="text-sm font-medium text-[#034f72]">
                  {user.name}
                </span>
                <button
                  onClick={() => handleRemove(user._id)}
                  className="text-xs font-semibold text-red-400 bg-red-50 border border-red-200 px-3 py-1 rounded-2xl hover:bg-red-100 transition-colors duration-150"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Collaborators;
