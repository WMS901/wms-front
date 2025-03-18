import { useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="layout">
      <div className={`sidebar ${isSidebarOpen ? "" : "collapsed"}`}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
      <div className={`content ${isSidebarOpen ? "" : "collapsed"}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
