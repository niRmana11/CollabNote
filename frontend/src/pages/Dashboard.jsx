import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import NotesList from "../components/NotesList";
import CreateNote from "../components/CreateNote";

function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  const refreshNotes = () => {
    setRefresh(!refresh);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">CollabNote Dashboard</h1>

      <CreateNote refreshNotes={refreshNotes} />

      <NotesList key={refresh} />
    </DashboardLayout>
  );
}

export default Dashboard;
