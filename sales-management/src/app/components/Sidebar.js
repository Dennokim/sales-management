import Link from "next/link";

const SideBar = () => {
  return (
    <div className="fixed inset-y-0 right-0 w-64 bg-blue-200 overflow-auto">
      <ul>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/finance">Finance</Link>
        </li>
        <li>
          <Link href="/sales">Sales</Link>
        </li>
        <li>
          <Link href="/product">Products</Link>
        </li>
        <li>
          <Link href="/category">Category</Link>
        </li>
        <li>
          <Link href="/logout">Log out</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
