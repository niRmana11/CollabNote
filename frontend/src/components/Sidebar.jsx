import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-60 bg-gray-100 h-full p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Workspace</h2>

      <ul className="space-y-2">
        <li>
          <Link
            to="/dashboard"
            className="block cursor-pointer hover:text-blue-600"
          >
            Notes
          </Link>
        </li>

        <li>
          <Link
            to="/shared"
            className="block cursor-pointer hover:text-blue-600"
          >
            Shared Notes
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
