import { useEffect, useState } from "react";
import { getSharedNotes } from "../api/notesApi";

function SharedNotes() {
  const [notes, setNotes] = useState([]);

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shared Notes</h1>

      {notes.map((note) => (
        <div key={note._id} className="border p-4 mb-2 rounded">
          <h3 className="font-semibold">{note.title}</h3>
          <div
            className="text-gray-600 mb-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </div>
      ))}
    </div>
  );
}

export default SharedNotes;
