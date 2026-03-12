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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
        required
      />

      <div className="mb-4">
        <ReactQuill
          theme="snow"
          placeholder="Add the note content here..."
          value={content}
          onChange={setContent}
          className="h-20 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 mt-8 rounded"
      >
        Add Note
      </button>
    </form>
  );
}

export default CreateNote;
