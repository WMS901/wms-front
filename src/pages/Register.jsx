import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css"; // ✅ 스타일 파일 추가

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("회원가입 성공!");
        navigate("/login");
      } else {
        setError(data.message || "회원가입 실패");
      }
    } catch (err) {
      setError("서버 오류 발생");
    }
  };

  return (
    <div className="register-container"> {/* ✅ 수정된 클래스명 */}
      <div className="form-box">
        <h2>회원가입</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="이메일" required onChange={handleChange} />
          <input type="password" name="password" placeholder="비밀번호" required onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="비밀번호 확인" required onChange={handleChange} />
          <button type="submit">회원가입</button>
        </form>
        <p>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
