import React, { useState, useEffect } from "react";
import InventoryTable from "../components/InventoryTable";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [productName, setProductName] = useState("");
  const [inputDate, setInputDate] = useState("");
  const navigate = useNavigate();

  // ✅ 재고 데이터 불러오기
  useEffect(() => {
    fetchInventory();
  }, []);
  //@@@@@@@@@@@@@@@@@@@@

   // ✅ 로그인 체크 코드 제거 또는 주석 처리
  /*
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("⚠️ 로그인 필요: 로그인 페이지로 이동");
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
  }, [navigate]);
  */
 
  const fetchInventory = async () => {
    try {
      console.log("🔍 조회 버튼 클릭됨!");
      const queryParams = new URLSearchParams();
      if (productName) queryParams.append("name", productName);
      if (inputDate) queryParams.append("date", inputDate);

      const apiUrl = `/api/inventory?${queryParams.toString()}`;
    //const apiUrl = `http://195.168.9.111:1040/api/inventory?${queryParams.toString()}`;
      console.log("📡 API 요청 URL:", apiUrl);
      const response = await fetch(apiUrl, { method: "GET" });

      if (!response.ok) {
        throw new Error("조회 실패");
      }

      const data = await response.json();
      console.log("📥 API 응답 데이터:", data);

      setInventoryData(data.content || []);
    } catch (error) {
      console.error("🚨 오류 발생:", error);
    }
  };

  return (
    <div className="layout">
      {/* ✅ 사이드바 */}
      <aside className="sidebar">
        <h2>📦 WMS 메뉴</h2>
        <ul>
          <li onClick={() => navigate("/inventory")}>재고 관리</li>
          <li onClick={() => navigate("/inbound")}>입고 관리</li>
          <li onClick={() => navigate("/outbound")}>출고 관리</li>
        </ul>
      </aside>

      {/* ✅ 메인 콘텐츠 */}
      <main className="content">
        <h1>📦 재고 관리test</h1>

        {/* 필터 입력 */}
        <div className="filter-container">
          <input
            type="text"
            placeholder="상품명 입력"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
          />
          <button className="search-btn" onClick={fetchInventory}>
            📅 조회
          </button>
        </div>

        <InventoryTable data={inventoryData} />
      </main>
    </div>
  );
};

export default Inventory;
