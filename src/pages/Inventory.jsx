import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "../styles/Inventory.css";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const apiUrl = `${API_BASE_URL}/api/inventory`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("조회 실패");
      const data = await response.json();
      setInventoryData(data.content || []);
    } catch (error) {
      console.error("🚨 오류 발생:", error);
    }
  };

  //요청 보내기!
  const handleAsk = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mcp-inbound/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const result = await response.json();
      setAnswer(result.answer || "응답 없음");
    } catch (error) {
      console.error("❌ 질문 실패:", error);
      setAnswer("GPT 요청 실패");
    }
  };

  return (
    <div className="inventory-container">
      <main className="inventory-content">
        <h1>📦 재고 관리</h1>
                {/* GPT 자연어 질문 영역 추가 */}
                <div className="gpt-question-wrapper">
          <h3>🤖 AI 재고 질문</h3>
          <button className="action-btn" onClick={handleAsk}>
            질문하기
          </button>
          <textarea
            className="gpt-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="예: '안녕하세요~ 무엇을 도와드릴까요? 저는 입고 확정된 재고에 대해 학습돼있습니다.'"
          />

          {answer && (
            <div className="gpt-response">
              <strong>🧠 GPT 응답:</strong>
              <p>{answer}</p>
            </div>
          )}
        </div>

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
