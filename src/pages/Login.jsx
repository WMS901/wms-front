import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/login.css"; // ✅ 스타일 파일 추가

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ✅ 오류 메시지 상태 추가
  const navigate = useNavigate(); // 페이지 이동을 위한 Hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // ✅ 이전 오류 메시지 초기화

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // JWT 토큰 저장
        navigate("/inventory"); // 로그인 성공 시 재고관리 페이지로 이동
      } else {
        setErrorMessage(data.message || "로그인 실패"); // ✅ 오류 메시지 표시
      }
    } catch (error) {
      setErrorMessage("서버 오류. 다시 시도해주세요.");
      console.error("로그인 오류:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>로그인</h2>
        <form onSubmit={handleLogin} className="input-group">
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">로그인</button>
        </form>
        {errorMessage && <p className="error-message">⚠️ {errorMessage}</p>} {/* ✅ 오류 메시지 표시 */}
        <p>
          계정이 없으신가요? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
