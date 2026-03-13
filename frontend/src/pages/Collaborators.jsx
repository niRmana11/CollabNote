import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getNoteById,
  addCollaborator,
  removeCollaborator,
} from "../api/notesApi";

function Collaborators() {
  const { id } = useParams();

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

  if (!note) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold md-4">Manage Collaborators</h2>

      {/* Add collaborator */}
      <div className="flex gap-2 mb-4">
        <input
          type="email"
          placeholder="User Email"
          className="border p-2 flex-1 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Collaborator list */}
      <ul className="space-y-2">
        {note.collaborators.map((user) => (
          <li
            key={user._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{user.name}</span>

            <button
              onClick={() => handleRemove(user._id)}
              className="text-red-500"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Collaborators;
