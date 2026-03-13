import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditNote from "./pages/EditNote";
import Collaborators from "./pages/Collaborators";
import SharedNotes from "./pages/SharedNotes";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/edit-note/:id" element={<EditNote />} />
        <Route path="/collaborators/:id" element={<Collaborators />} />
        <Route path="/shared" element={<SharedNotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
