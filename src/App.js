import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const LoginPage = lazy(() => import('./components/AuthPage/LoginPage'));
const RegisterPage = lazy(() => import('./components/AuthPage/RegisterPage'));
const HomePage = lazy(() => import('./components/HomePage/HomePage'));

function App() {
  return (
    <Router>
      <div className="app-container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} /> {/* 404 Route */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
