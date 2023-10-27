import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div>
      <ul>
        <li>
          <Link href="/Dashboard">Dashboard</Link>
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
          <Link href="/category">Categories</Link>
        </li>
        <li>
          <Link href="/logout">Log out</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
