import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/OutboundRequest.css";

const OutboundRequest = () => {
  const { outboundId } = useParams(); // ✅ URL에서 outboundId만 가져오기
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    // ✅ 백엔드 API에서 해당 outboundId의 상품 상세 정보 가져오기
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`https://api.sol-wms.store/api/inventory/${outboundId}`);
        if (!response.ok) {
          throw new Error("상품 상세 정보를 불러올 수 없습니다.");
        }
        const data = await response.json();
        setItem(data); // ✅ 최신 데이터 업데이트
      } catch (error) {
        console.error("🚨 API 오류:", error);
      }
    };

    fetchItemDetails();
  }, [outboundId]);

  const handleSubmit = () => {
    console.log(`📦 출고 요청! outboundId: ${outboundId}, 수량: ${quantity}`);
    alert(`출고 요청 완료! outboundId: ${outboundId}, 수량: ${quantity}`);
    navigate("/inventory");
  };

  if (!item) return <p>🔄 상품 정보를 불러오는 중...</p>; // ✅ 데이터 로딩 중 표시

  return (
    <div className="outbound-request-container">
      <h1>📦 출고 요청</h1>

      <table className="outbound-info-table">
        <tbody>
          <tr><td><strong>상품 코드</strong></td><td>{outboundId}</td></tr>
          <tr><td><strong>상품명</strong></td><td>{item.name}</td></tr>
          <tr><td><strong>카테고리</strong></td><td>{item.category}</td></tr>
          <tr><td><strong>현재 재고</strong></td><td>{item.quantity}</td></tr>
          <tr><td><strong>예약 수량</strong></td><td>{item.reservedQuantity || 0}</td></tr> {/* ✅ 예약 수량 추가 */}
          <tr><td><strong>가격</strong></td><td>{item.price} 원</td></tr>
          <tr><td><strong>공급업체</strong></td><td>{item.supplier}</td></tr>
          <tr><td><strong>위치</strong></td><td>{item.location}</td></tr>
        </tbody>
      </table>

      <input
        type="number"
        placeholder="출고 수량 입력"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
        max={item.quantity - (item.reservedQuantity || 0)} // ✅ 출고 가능 수량 제한
      />
      <button className="confirm-btn" onClick={handleSubmit}>
        출고 요청
      </button>
    </div>
  );
};

export default OutboundRequest;
