import DashboardLayout from "../layouts/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Welcome to CollabNote</h1>

      <p className="mt-4 text-gray-600">Your notes will appear here.</p>
    </DashboardLayout>
  );
}

export default Dashboard;
