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
    <div className="flex justify-between items-center bg-[#00a6fb] text-white px-6 py-5">
      <h1 className="text-2xl font-bold">
        Collab<span className="text-black">Note</span>
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white text-[#fb004f] font-semibold px-4 py-2 rounded-3xl border border-transparent hover:bg-[#fff0f3] hover:border-[#fb004f] transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
