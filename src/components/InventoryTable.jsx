import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InventoryTable.css";

const InventoryTable = ({ data, type }) => {
  const navigate = useNavigate();

  console.log("✅ 현재 InventoryTable type:", type);
  console.log("📦 전달된 데이터:", data); // ✅ 데이터 확인 로그 추가

  const renderActionButton = (item) => {
    if (type === "inventory") {
      return (
        <button
          className="action-btn"
          onClick={() => navigate(`/outbound-request/${item.sku}`)}
        >
          출고 요청
        </button>
      );
    } else if (type === "inbound") {
      return (
        <button
          className="action-btn"
          onClick={() => console.log(`📦 입고 확정: ${item.sku}`)}
        >
          입고 확정
        </button>
      );
    } else if (type === "outbound") {
      return (
        <button
          className="action-btn"
          onClick={() => console.log(`📦 출고 확정: ${item.sku}`)}
        >
          출고 확정
        </button>
      );
    }
  };

  return (
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
          <th>등록일</th> {/* ✅ API의 createdAt과 매핑 필요 */}
          <th>액션</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => (
            <tr key={item.sku}>
              <td><input type="checkbox" /></td>
              <td>{item.sku}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.price} 원</td>
              <td>{item.supplier}</td>
              <td>{item.location}</td>
              <td>{item.createdAt}</td> {/* ✅ API의 createdAt을 테이블에 매핑 */}
              <td>{renderActionButton(item)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10" className="no-data">데이터 없음</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InventoryTable;
