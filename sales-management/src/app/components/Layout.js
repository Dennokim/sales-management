import SideBar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <SideBar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
