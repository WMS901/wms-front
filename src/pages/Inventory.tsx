import React, { useState, useEffect } from "react";
import InventoryTable from "../components/InventoryTable";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [productName, setProductName] = useState("");
  const [inputDate, setInputDate] = useState("");
  const navigate = useNavigate();
  //123123123
  // 재고 데이터 불러오기 (필터 적용)
  const fetchInventory = async () => {
    try {
      console.log("🔍 조회 버튼 클릭됨!"); // 🔹 버튼 클릭 확인
  
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }
  
      const queryParams = new URLSearchParams();
      if (productName) queryParams.append("productName", productName);
      if (inputDate) queryParams.append("inputDate", inputDate);
  
      console.log("디버깅 test API요청:", `http://localhost:5000/api/inventory?${queryParams.toString()}`);
  
      const response = await fetch(
        `http://localhost:5000/api/inventory?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const data = await response.json();
      console.log("API 응답:", data);
  
      if (!response.ok) throw new Error(`조회 실패: ${data.message || "알 수 없는 오류"}`);
  
      setInventoryData(data);
    } catch (error) {
      console.error("🚨 재고 데이터를 불러오는 중 오류 발생:", error);
    }
  };

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("로그인이 필요합니다.");
    navigate("/login");
    return;
  }
  fetchInventory();
}, [navigate, productName, inputDate]); // 🔹 필터 변경 시 자동 조회

  return (
    <div className="container">
      <h1>📦 재고 관리</h1>

      {/* 필터 입력 영역 */}
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
    </div>
  );
};

export default Inventory;