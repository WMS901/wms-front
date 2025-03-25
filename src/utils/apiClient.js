import axios from "axios";
import API_BASE_URL from "../config"; // ✅ API 기본 URL 가져오기

// ✅ Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ RefreshToken을 쿠키로 보낼 경우 필요
});

// ✅ 요청 인터셉터: 모든 요청에 AccessToken 추가
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// ✅ 응답 인터셉터: AccessToken 만료 시 RefreshToken으로 재발급 후 기존 요청 재시도
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ AccessToken 만료됨, RefreshToken으로 재발급 요청");

      try {
        // ✅ RefreshToken 요청
        const res = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {}, { withCredentials: true });

        if (res.status === 200) {
          console.log("✅ AccessToken 재발급 성공");

          // ✅ 새 AccessToken 저장
          localStorage.setItem("accessToken", res.data.accessToken);
          apiClient.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;

          // ✅ 원래 요청 재시도
          error.config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
          return apiClient.request(error.config);
        }
      } catch (refreshError) {
        console.error("❌ RefreshToken 만료됨, 로그아웃 처리");
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // ✅ 로그인 페이지로 이동
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
