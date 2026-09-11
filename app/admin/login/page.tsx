"use client";

import React, { useState, useEffect } from "react";
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Kredensial tidak valid");
      }

      setSuccess(true);
      // Hard redirect agar cookie tersimpan sebelum navigate
      await new Promise((r) => setTimeout(r, 600));
      window.location.href = "/admin";
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan pada server";
      setError(message);
      setLoading(false);
    }
  };

  const bgStyle: React.CSSProperties = {
    minHeight: "100vh",
    width: "100%",
    background: "#0a0a0a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    position: "relative",
    overflow: "hidden",
  };

  const orb1Style: React.CSSProperties = {
    position: "absolute",
    top: "-10%",
    left: "-15%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
    filter: "blur(60px)",
    pointerEvents: "none",
  };

  const orb2Style: React.CSSProperties = {
    position: "absolute",
    bottom: "-5%",
    right: "-10%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(37,211,102,0.06) 0%, transparent 70%)",
    filter: "blur(80px)",
    pointerEvents: "none",
  };

  const gridStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
    pointerEvents: "none",
    opacity: mounted ? 1 : 0,
    transition: "opacity 0.8s ease",
  };

  return (
    <div style={bgStyle}>
      <style>{`
        @keyframes slide-up-login {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-login {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin-loader {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .login-header-anim {
          animation: slide-up-login 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }
        .login-card-anim {
          animation: slide-up-login 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        .login-footer-anim {
          animation: fade-in-login 0.5s ease 0.8s both;
        }
        .admin-input {
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          outline: none;
          width: 100%;
          color: white;
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          border-radius: 12px;
          padding: 13px 16px 13px 42px;
        }
        .admin-input::placeholder {
          color: rgba(255,255,255,0.2);
        }
        .admin-input:focus {
          border-color: rgba(255,255,255,0.35);
          background: rgba(0,0,0,0.55);
          box-shadow: 0 0 0 3px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .admin-input-password {
          padding-right: 44px;
        }
        .admin-input:disabled {
          opacity: 0.6;
        }
        .btn-login-main {
          position: relative;
          overflow: hidden;
          background: white;
          color: black;
          border: none;
          cursor: pointer;
          border-radius: 12px;
          padding: 13px 24px;
          font-family: 'Geist', sans-serif;
          font-size: 14px;
          font-weight: 600;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }
        .btn-login-main::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent);
          transition: left 0.5s ease;
        }
        .btn-login-main:hover::before { left: 100%; }
        .btn-login-main:hover {
          background: rgba(240,240,240,1);
          box-shadow: 0 8px 32px -8px rgba(255,255,255,0.25);
          transform: translateY(-1px);
        }
        .btn-login-main:active { transform: scale(0.98) translateY(0); }
        .btn-login-main:disabled {
          opacity: 0.6;
          pointer-events: none;
        }
        .show-password-btn {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          padding: 0 14px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }
        .show-password-btn:hover {
          color: rgba(255,255,255,0.5);
        }
        .spinner-loader {
          width: 16px; height: 16px;
          border: 2px solid rgba(0,0,0,0.2);
          border-top-color: black;
          border-radius: 50%;
          animation: spin-loader 0.7s linear infinite;
        }
        .success-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(37,211,102,0.3);
          border-top-color: #25D366;
          border-radius: 50%;
          animation: spin-loader 0.7s linear infinite;
        }
        .pulse-dot {
          animation: pulse-dot 2s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        .card-top-edge {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        }
        .error-anim {
          animation: slide-up-login 0.3s ease;
        }
        .success-overlay {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border-radius: 16px;
          background: rgba(10,10,10,0.95);
          backdrop-filter: blur(4px);
          animation: fade-in-login 0.4s ease;
        }
      `}</style>

      {/* Background decorations */}
      <div style={orb1Style} />
      <div style={orb2Style} />
      <div style={gridStyle} />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 10 }}>
        {/* Header */}
        <div className="login-header-anim" style={{ textAlign: "center", marginBottom: "32px" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            marginBottom: "20px",
          }}>
            <span className="pulse-dot" style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#25D366",
              boxShadow: "0 0 8px rgba(37,211,102,0.6)",
              display: "inline-block",
            }} />
            <span style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: "11px",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.15em",
              fontWeight: 500,
            }}>
              Portfolio CMS
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(32px, 8vw, 48px)",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            margin: "0 0 12px 0",
          }}>
            Admin Panel
          </h1>
          <p style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.6,
            margin: 0,
          }}>
            Masuk untuk mengelola seluruh konten
            <br />
            website portofolio Anda.
          </p>
        </div>

        {/* Card */}
        <div className="login-card-anim" style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 32px 64px -24px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
          <div className="card-top-edge" />

          {/* Decorative quote */}
          <div style={{
            position: "absolute",
            top: "-10px",
            right: "16px",
            fontSize: "120px",
            fontFamily: "'Syne', sans-serif",
            color: "rgba(255,255,255,0.02)",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}>
            ❝
          </div>

          {/* Success overlay */}
          {success && (
            <div className="success-overlay">
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(37,211,102,0.15)",
                border: "1px solid rgba(37,211,102,0.3)",
                boxShadow: "0 0 20px rgba(37,211,102,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <ShieldCheck style={{ width: "24px", height: "24px", color: "#25D366" }} />
              </div>
              <p style={{ color: "white", fontWeight: 600, fontSize: "14px", margin: 0 }}>Login berhasil!</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: 0 }}>Mengalihkan ke dashboard...</p>
              <div className="success-spinner" />
            </div>
          )}

          <div style={{ padding: "32px" }}>
            {/* Error */}
            {error && (
              <div className="error-anim" style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                padding: "14px 16px",
                borderRadius: "12px",
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                marginBottom: "20px",
              }}>
                <span style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#ef4444",
                  marginTop: "5px",
                  flexShrink: 0,
                  display: "inline-block",
                }} />
                <span style={{ color: "#f87171", fontSize: "13px" }}>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} id="admin-login-form" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Username Field */}
              <div>
                <label htmlFor="admin-username" style={{
                  display: "block",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.12em",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}>
                  Username atau Email
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    paddingLeft: "14px",
                    display: "flex",
                    alignItems: "center",
                    pointerEvents: "none",
                  }}>
                    <User style={{ width: "16px", height: "16px", color: "rgba(255,255,255,0.25)" }} />
                  </div>
                  <input
                    id="admin-username"
                    type="text"
                    className="admin-input"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    disabled={loading || success}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="admin-password" style={{
                  display: "block",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.12em",
                  fontWeight: 500,
                  marginBottom: "8px",
                }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    paddingLeft: "14px",
                    display: "flex",
                    alignItems: "center",
                    pointerEvents: "none",
                  }}>
                    <Lock style={{ width: "16px", height: "16px", color: "rgba(255,255,255,0.25)" }} />
                  </div>
                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    className={`admin-input admin-input-password`}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading || success}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="show-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div style={{ paddingTop: "4px" }}>
                <button
                  id="admin-login-btn"
                  type="submit"
                  className="btn-login-main"
                  disabled={loading || success}
                >
                  {loading && !success ? (
                    <>
                      <div className="spinner-loader" />
                      <span>Memverifikasi...</span>
                    </>
                  ) : (
                    <>
                      <span>Masuk ke Dashboard</span>
                      <ArrowRight style={{ width: "16px", height: "16px" }} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Hint */}
            <div style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}>
              <ShieldCheck style={{ width: "14px", height: "14px", color: "#25D366" }} />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
                Default:{" "}
                <strong style={{ color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>admin</strong>
                {" / "}
                <strong style={{ color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>admin123</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Back to site */}
        <div className="login-footer-anim" style={{ textAlign: "center", marginTop: "24px" }}>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              fontFamily: "'Geist Mono', monospace",
              color: "rgba(255,255,255,0.25)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.25)"; }}
          >
            <span>←</span>
            <span>Kembali ke Website Utama</span>
          </a>
        </div>
      </div>
    </div>
  );
}
