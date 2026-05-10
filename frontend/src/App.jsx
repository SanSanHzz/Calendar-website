import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import { I18nProvider, useI18n } from "./context/I18nContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function ProtectedRoute({ children }) {
  const { token, authReady } = useAuth();

  if (!authReady) {
    return <div className="page-shell centered-panel">Loading session...</div>;
  }

  return token ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children }) {
  const { token, authReady } = useAuth();

  if (!authReady) {
    return <div className="page-shell centered-panel">Loading session...</div>;
  }

  return token ? <Navigate to="/dashboard" replace /> : children;
}

function NavbarWrapper() {
  const { token } = useAuth();
  const [theme, setTheme] = useState(() => localStorage.getItem("calendar_theme") || "light");
  const { language, setLanguage } = useI18n();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("calendar_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("calendar_language", language);
  }, [language]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((lang) => (lang === "en" ? "es" : "en"));
  };

  return (
    <Navbar
      isAuthenticated={Boolean(token)}
      isDarkTheme={theme === "dark"}
      onToggleTheme={toggleTheme}
      language={language}
      onToggleLanguage={toggleLanguage}
    />
  );
}

export default function App() {
  const [language, setLanguage] = useState(() => localStorage.getItem("calendar_language") || "en");

  return (
    <I18nProvider value={{ language, setLanguage }}>
      <div className="app-shell">
        <NavbarWrapper />
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route path="/register" element={<Navigate to="/login" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ProtectedRoute><Navigate to="/dashboard" replace /></ProtectedRoute>} />
        </Routes>
      </div>
    </I18nProvider>
  );
}
