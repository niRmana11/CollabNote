import { useState } from "react";
import ReactQuill from "react-quill";
import { createNote } from "../api/notesApi";

function CreateNote({ refreshNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createNote({ title, content });

      setTitle("");
      setContent("");

      refreshNotes();
    } catch (err) {
      console.error("Note creation failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-blue-100 p-5 rounded-3xl shadow-sm mb-6"
    >
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-blue-200 bg-blue-50 p-2 px-4 mb-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-200"
        required
      />

      <div className="rounded-2xl overflow-hidden border border-blue-200">
        <ReactQuill
          theme="snow"
          placeholder="Add the note content here..."
          value={content}
          onChange={setContent}
          className="h-24 rounded-2xl text-sm"
        />
      </div>

      <button
        type="submit"
        className="bg-[#15a8ed] text-white text-sm font-semibold px-5 py-2 mt-5 rounded-2xl hover:bg-[#0484c0] transition-colors duration-150"
      >
        Add Note
      </button>
    </form>
  );
}

export default CreateNote;
