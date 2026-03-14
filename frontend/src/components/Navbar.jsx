import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-blue-600 text-white px-6 py-3">
      <h1 className="text-xl font-bold">CollabNote</h1>

      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
