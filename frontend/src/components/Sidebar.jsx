function Sidebar() {
  return (
    <div className="w-60 bg-gray-100 h-full p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Workspace</h2>

      <ul className="space-y-2">
        <li className="cursor-pointer hover:text-blue-600">Notes</li>

        <li className="cursor-pointer hover:text-blue-600">Shared Notes</li>
      </ul>
    </div>
  );
}

export default Sidebar;
