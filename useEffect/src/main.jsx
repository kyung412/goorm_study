import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import App from './App.jsx'; 
// import App from './App2.jsx'; // 상태변화 감지(update)
// import App from './App3.jsx' // 외부데이터 마운트 시 한 번만 실행
import App from './App4.jsx'; // 언마운트시 실행
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

