import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/OutboundRequest.css"; // ✅ 스타일 적용

const OutboundRequest = ({ selectedItem }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(""); // ✅ 출고 수량만 상태 관리

  // ✅ 선택된 상품 정보 로드 (출고 수량만 입력 가능)
  useEffect(() => {
    if (selectedItem) {
      setQuantity(""); // ✅ 수량 입력값 초기화
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quantity || quantity <= 0) {
      alert("🚨 출고 수량을 올바르게 입력하세요!");
      return;
    }

    try {
      const response = await fetch("/api/outbound", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku: selectedItem.sku,
          quantity: quantity, // ✅ 수량만 전송
        }),
      });

      if (!response.ok) {
        throw new Error("출고 요청 실패");
      }

      alert("📦 출고 요청 완료!");
      navigate("/outbound"); // ✅ 출고 등록 후 이동
    } catch (error) {
      console.error("🚨 오류 발생:", error);
    }
  };

  return (
    <div className="outbound-form-container">
      <h1>📦 출고 요청</h1>
      <form onSubmit={handleSubmit}>
        <div className="info-box">
          <label>상품명:</label> <span>{selectedItem?.name || "N/A"}</span>
        </div>

        <div className="info-box">
          <label>카테고리:</label> <span>{selectedItem?.category || "N/A"}</span>
        </div>

        <div className="info-box">
          <label>공급업체:</label> <span>{selectedItem?.supplier || "N/A"}</span>
        </div>

        <div className="info-box">
          <label>위치:</label> <span>{selectedItem?.location || "N/A"}</span>
        </div>

        <label>출고 수량</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={handleChange}
          required
          min="1"
        />

        <button type="submit">출고 등록</button>
      </form>
    </div>
  );
};

export default OutboundRequest;
