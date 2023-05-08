import SignInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';
import * as React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ShopPage from './pages/ShopPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ShopPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/register" element={<SignUpPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
