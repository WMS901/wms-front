import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "../styles/Inventory.css"; // ✅ 재고 관리와 같은 스타일 적용

const Inbound = () => {
  const [inboundItems, setInboundItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInboundItems();
  }, []);

  const fetchInboundItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/inbound`);
      if (!response.ok) throw new Error("데이터 불러오기 실패");
  
      const data = await response.json();
      console.log("📥 API 응답 데이터:", data);
  
      // `content`가 있는지 확인 후 할당, 없으면 `data` 자체를 배열로 가정
      setInboundItems(Array.isArray(data.content) ? data.content : data);
    } catch (error) {
      console.error("🚨 오류 발생:", error);
    }
  };

  // const confirmInbound = async (sku) => {
  //   try {
  //     const response = await fetch("/api/inbound/", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ confirmed: true }),
  //     });

  //     if (!response.ok) throw new Error("입고 확정 실패");

  //     // ✅ UI 업데이트: 해당 항목을 리스트에서 제거
  //     setInboundItems((prevItems) => prevItems.filter((item) => item.sku !== sku));
  //   } catch (error) {
  //     console.error("🚨 오류 발생:", error);
  //   }
  // };

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
  
      console.log(`📩 입고 확정 완료: SKU ${sku}`);
  
      // ✅ UI 업데이트: 해당 항목을 리스트에서 제거
      setInboundItems((prevItems) => prevItems.filter((item) => item.sku !== sku));
    } catch (error) {
      console.error("🚨 오류 발생:", error);
    }
  };
  

  return (
    <div className="inventory-container">
      <main className="inventory-content">
        <h1>📦 입고 관리</h1>

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
                    <td><input type="checkbox" /></td>
                    <td>{item.sku}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price} 원</td>
                    <td>{item.supplier}</td>
                    <td>{item.location}</td>
                    <td>{new Date(item.createdAt).toLocaleString("ko-KR")}</td>
                    <td>
                      <button className="action-btn confirm-btn" onClick={() => confirmInbound(item.sku)}>
                        입고 확정
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
