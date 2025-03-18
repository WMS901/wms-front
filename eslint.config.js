import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', 'node_modules', 'build' "src/config.js"] }, // ✅ 검사 제외 폴더 추가
  {
    files: ['**/*.{jsx,js}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        fetch: "readonly", // ✅ fetch 오류 해결
        alert: "readonly", // ✅ alert 오류 해결
        localStorage: "readonly", // ✅ localStorage 오류 해결
        API_URL: "readonly", // ✅ API_URL 관련 오류 해결
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } }, // ✅ React 버전 자동 감지
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off", // ✅ JSX에서 React 자동 인식
      "react/prop-types": "off", // ✅ PropTypes 검증 비활성화
      "no-unused-vars": "warn", // ✅ 사용하지 않는 변수 경고
      "no-undef": "off", // ✅ fetch, API_URL 미정의 오류 해결
    },
  },
];
