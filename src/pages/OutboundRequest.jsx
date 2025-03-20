import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API_BASE_URL from "../config";
import "../styles/OutboundRequest.css";

const OutboundRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();  
  const selectedItem = location.state?.selectedItem;

  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    console.log("📡 selectedItem 데이터:", selectedItem);
    if (selectedItem) {
      setQuantity("");
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
      const response = await fetch(`${API_BASE_URL}/api/outbound`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sku: selectedItem?.sku,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("출고 요청 실패");
      }

      alert("📦 출고 요청 완료!");
      navigate("/outbound");
    } catch (error) {
      console.error("🚨 오류 발생:", error);
    }
  };

  return (
    <div className="outbound-form-container">
      <h1>📦 출고 요청</h1>
      {selectedItem ? (
        <form onSubmit={handleSubmit}>
          <div className="info-box">
            <label>상품명:</label> <span>{selectedItem.name}</span>
          </div>

          <div className="info-box">
            <label>카테고리:</label> <span>{selectedItem.category}</span>
          </div>

          <div className="info-box">
            <label>수량:</label> <span>{selectedItem.quantity}</span>
          </div>

          <div className="info-box">
            <label className="available-quantity">가능 수량:</label> <span className="available-quantity">{(selectedItem?.quantity || 0) - (selectedItem?.reservedQuantity || 0)}</span>
          </div>

          <div className="info-box">
            <label>가격:</label> <span>{selectedItem.price}</span>
          </div>

          <div className="info-box">
            <label>공급업체:</label> <span>{selectedItem.supplier}</span>
          </div>

          <div className="info-box">
            <label>위치:</label> <span>{selectedItem.location}</span>
          </div>

          <div className="info-box">
            <label>등록일:</label> <span>{selectedItem.createdAt}</span>
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
      ) : (
        <p className="error">🚨 상품 정보를 불러올 수 없습니다.</p>
      )}
    </div>
  );
};

export default OutboundRequest;
