import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "../styles/Inventory.css";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      console.log("🔍 조회 버튼 클릭됨!");
      const apiUrl = `${API_BASE_URL}/api/inventory`;
      console.log("📡 API 요청 URL:", apiUrl);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

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
    <div className="inventory-container">
      <main className="inventory-content">
        <h1>📦 재고 관리</h1>

        {/* ✅ 테이블 직접 포함 */}
        <div className="table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>선택</th>
                <th>상품 코드</th>
                <th>상품명</th>
                <th>카테고리</th>
                <th>수량</th>
                <th>가격</th>
                <th>공급업체</th>
                <th>위치</th>
                <th>등록일</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.length > 0 ? (
                inventoryData.map((item) => (
                  <tr key={item.sku}>
                    <td><input type="checkbox" /></td>
                    <td>{item.sku}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price} 원</td>
                    <td>{item.supplier}</td>
                    <td>{item.location}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => navigate(`/outbound/${item.sku}`, { state: { selectedItem: item } })}
                      >
                        출고 요청
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">데이터 없음</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
