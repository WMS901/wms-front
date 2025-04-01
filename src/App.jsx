import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Inventory from "./pages/Inventory";
import InboundNew from "./pages/InboundNew";
import Inbound from "./pages/Inbound";
import Outbound from "./pages/Outbound";
import OutboundRequest from "./pages/OutboundRequest";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ 로그인과 회원가입은 Layout 적용 X (전체 페이지 차지해야 함) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ 나머지는 Layout 안에서 표시 */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/inbound" element={<Inbound />} />
                <Route path="/inbound/new" element={<InboundNew />} />
                <Route path="/outbound" element={<Outbound />} />
                <Route path="/outbound/:outboundId" element={<OutboundRequest />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
