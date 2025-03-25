import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";
import "../styles/login.css"; // ✅ 스타일 파일 추가

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ✅ 오류 메시지 상태 추가
  const navigate = useNavigate(); // 페이지 이동을 위한 Hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("📌 서버 응답 데이터:", data); //응답 확인

        if (response.ok && data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken); // 수정: accessToken 저장
            console.log("JWT 저장 완료:", data.accessToken); //  저장 확인 로그
            navigate("/inventory");
        } else {
            setErrorMessage(data.message || "로그인 실패");
        }
    } catch (error) {
        setErrorMessage("서버 오류. 다시 시도해주세요.");
        console.error("🚨 로그인 오류:", error);
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
        {errorMessage && <p className="error-message">⚠️ {errorMessage}</p>}
        <p>
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
