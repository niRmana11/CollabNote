import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-blue-50 px-4 py-10">
      <div className="flex justify-center mt-10 px-4">
        <form
          onSubmit={handleUpdate}
          className="w-full max-w-3xl bg-white border border-blue-100 p-6 rounded-3xl shadow-sm"
        >
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 text-sm text-[#0286c3] font-medium hover:text-[#034f72] mb-5 transition-colors duration-150"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          <h2 className="text-xl font-bold mb-4">Edit Note</h2>

          <input
            type="text"
            className="w-full border border-blue-200 bg-blue-50 p-2 px-4 mb-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="rounded-2xl overflow-hidden border border-blue-200 mb-10">
            <ReactQuill
              value={content}
              onChange={setContent}
              className="h-36 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-[#15a8ed] text-white text-sm font-semibold px-5 py-2 rounded-2xl hover:bg-[#0484c0] transition-colors duration-150"
          >
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditNote;
