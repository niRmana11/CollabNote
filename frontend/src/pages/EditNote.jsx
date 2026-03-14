import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getNoteById, updateNote } from "../api/notesApi";

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNote = async () => {
    try {
      const res = await getNoteById(id);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.error("Failed to load note");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateNote(id, { title, content });
      navigate("/dashboard");
    } catch (err) {
      console.error("Update failed");
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <div className="flex justify-center mt-10">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-3xl bg-white p-6 rounded shadow"
      >
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1 text-blue-500 hover:text-blue-700 mb-4"
        >
          ← Back to Dashboard
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Note</h2>

        <input
          type="text"
          className="w-full border p-2 mb-4 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <ReactQuill
          value={content}
          onChange={setContent}
          className="mb-4 h-36"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-9 rounded"
        >
          Update Note
        </button>
      </form>
    </div>
  );
}

export default EditNote;
