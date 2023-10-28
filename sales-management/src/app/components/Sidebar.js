import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 right-0 w-64 bg-blue-200 overflow-auto">
      <ul>
        <li>
          <Link href="/Dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/Finance">Finance</Link>
        </li>
        <li>
          <Link href="/Sales">Sales</Link>
        </li>
        <li>
          <Link href="/Product">Products</Link>
        </li>
        <li>
          <Link href="/Category">Category</Link>
        </li>
        <li>
          <Link href="/Logout">Log out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
