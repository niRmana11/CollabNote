import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-48 bg-blue-100 h-full p-5 border-r border-blue-100">
      <h2 className="text-lg font-bold text-[#034f72] mb-6 uppercase">
        Workspace
      </h2>

      <ul className="space-y-1">
        <li>
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded-2xl text-md font-medium text-gray-800 hover:bg-blue-200 hover:text-[#034f72] transition-colors duration-150"
          >
            Notes
          </Link>
        </li>

        <li>
          <Link
            to="/shared"
            className="block px-4 py-2 rounded-2xl text-md font-medium text-gray-800 hover:bg-blue-200 hover:text-[#034f72] transition-colors duration-150"
          >
            Shared Notes
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
