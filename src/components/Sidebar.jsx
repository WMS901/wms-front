import { useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {isOpen && (
        <>
          <h1 className="sidebar-title">📦 WMS 메뉴</h1>
          <ul>
            <li onClick={() => navigate("/inventory")}>재고 관리</li>
            <li onClick={() => navigate("/inbound/new")}>입고 추가</li>
            <li onClick={() => navigate("/inbound")}>입고 관리</li>
            <li onClick={() => navigate("/outbound")}>출고 관리</li>
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
