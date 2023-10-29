import SideBar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <div className="ml-52 p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
