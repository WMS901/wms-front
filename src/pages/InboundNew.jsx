import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
import "../styles/InboundNew.css"; // ✅ 스타일 추가

const InboundNew = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    category: "",
    quantity: "",
    supplier: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // JWT 가져오기
    console.log("📌 로컬 스토리지에서 가져온 JWT:", token); // ✅ JWT 확인

    if (!token) {
      alert("인증 실패: 로그인 후 다시 시도하세요.");
      //navigate("/login");
      return;
    }

    try {
      console.log("📌 API 요청 시작: ", `${API_BASE_URL}/api/inbound`);
      const response = await fetch(`${API_BASE_URL}/api/inbound`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ JWT 포함
        },
        body: JSON.stringify(formData),
      });

      console.log("📌 응답 상태 코드:", response.status);
      const responseData = await response.text();
      console.log("📌 응답 데이터:", responseData);

      if (!response.ok) {
        throw new Error("입고 요청 실패");
      }

      alert("📦 입고 등록 완료!");
      navigate("/inbound"); // 입고 등록 후 입고관리 페이지로 이동
    } catch (error) {
      console.error("🚨 오류 발생:", error);
    }
  };

  return (
    <div className="inbound-form-container">
      <h1>📦 입고 추가</h1>
      <form onSubmit={handleSubmit}>
        <label>상품명</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>카테고리</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />

        <label>수량</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required min="1" />

        <label>가격</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required min="1" />

        <label>공급업체</label>
        <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} required />

        <label>위치</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <button type="submit">입고 등록</button>
      </form>
    </div>
  );
};

export default InboundNew;
