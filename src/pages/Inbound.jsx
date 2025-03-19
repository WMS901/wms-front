import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "../styles/Inventory.css"; // ✅ 스타일 유지

const Inbound = () => {
  const [inboundItems, setInboundItems] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ 로딩 상태 추가
  const [error, setError] = useState(null); // ✅ 에러 상태 추가
  const navigate = useNavigate();

  useEffect(() => {
    fetchInboundItems();
  }, []);

  const fetchInboundItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/inbound`);
      if (!response.ok) throw new Error("데이터 불러오기 실패");

      const data = await response.json();
      console.log("📥 API 응답 데이터:", data);

      setInboundItems(Array.isArray(data.content) ? data.content : data);
    } catch (error) {
      console.error("🚨 오류 발생:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmInbound = async (sku) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/inbound/${sku}/confirm`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confirmed: true }),
      });

      if (!response.ok) throw new Error("입고 확정 실패");

      const updatedItem = await response.json();
      console.log(`📩 입고 확정 완료: SKU ${sku}`, updatedItem);

      // ✅ UI 업데이트: 해당 SKU의 `confirmed` 상태 변경
      setInboundItems((prevItems) =>
        prevItems.map((item) =>
          item.sku === sku ? { ...item, confirmed: true } : item
        )
      );

      // ✅ 입고 확정 후 최신 데이터 다시 불러오기
      fetchInboundItems();
    } catch (error) {
      console.error("🚨 오류 발생:", error);
      setError(error.message);
    }
  };

  return (
    <div className="inventory-container">
      <main className="inventory-content">
        <h1>📦 입고 관리</h1>

        {loading && <p className="loading-message">⏳ 데이터를 불러오는 중...</p>}
        {error && <p className="error-message">🚨 오류: {error}</p>}

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
                <th>액션</th>
              </tr>
            </thead>
            <tbody>
              {inboundItems.length > 0 ? (
                inboundItems.map((item) => (
                  <tr key={item.sku}>
                    <td><input type="checkbox" disabled={item.confirmed} /></td>
                    <td>{item.sku}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price} 원</td>
                    <td>{item.supplier}</td>
                    <td>{item.location}</td>
                    <td>{new Date(item.createdAt).toLocaleString("ko-KR")}</td>
                    <td>
                      <button
                        className="action-btn confirm-btn"
                        onClick={() => confirmInbound(item.sku)}
                        disabled={item.confirmed} // ✅ 입고 확정된 항목이면 버튼 비활성화
                      >
                        {item.confirmed ? "✔ 확정됨" : "입고 확정"}
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

export default Inbound;
