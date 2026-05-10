import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar({ isAuthenticated, isDarkTheme, onToggleTheme, language, onToggleLanguage }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link className="brand" to={isAuthenticated ? "/dashboard" : "/login"}>
          {user?.picture ? (
            <img className="brand-avatar" src={user.picture} alt={user.name} />
          ) : (
            <span className="brand-mark">{user?.name?.[0] || user?.email?.[0] || "A"}</span>
          )}
          <div>
            <strong>{user?.name || "Personal Calendar"}</strong>
            <p>{user?.email || "Plan by conversation"}</p>
          </div>
        </Link>

      <nav className="nav-actions">
        <button className="ghost-button theme-toggle" onClick={onToggleLanguage} type="button" aria-label="Toggle language">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <span className="lang-code">{language === "en" ? "ES" : "EN"}</span>
        </button>
        <button className="ghost-button theme-toggle" onClick={onToggleTheme} type="button" aria-label="Toggle theme">
          {isDarkTheme ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
        {isAuthenticated ? (
          <>
            <div className="user-chip">
              {user?.picture ? (
                <img src={user.picture} alt={user.name} />
              ) : (
                <span>{user?.name?.[0] || "U"}</span>
              )}
              <div>
                <strong>{user?.name || "User"}</strong>
                <p>{user?.email}</p>
              </div>
            </div>
            <button className="ghost-button" onClick={handleLogout} type="button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </>
        ) : null}
      </nav>
    </header>
  );
}
