import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import "../AuthStyles/Auth.css";

/**
 * Login page component.
 *
 * Responsibilities:
 * - Renders the login form UI.
 * - Handles user authentication via AuthContext.
 * - Manages local form state and validation.
 * - Redirects the user after successful login.
 *
 * Notes:
 * - Authentication logic is delegated to AuthProvider.
 * - Supports auth bypass for development environments.
 * - Social login buttons are visual-only placeholders.
 */

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles form submission and triggers authentication.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !agree) return;

    try {
      setLoading(true);
      await login({ username, password });
      navigate("/posts");
    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-card">
        <h2 className="text-center fw-bold mb-2">Log in</h2>
        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}
        <p className="text-center text-muted mb-4">
          New to Social Network?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Sign up for free
          </span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="username"
              required
              className="form-control form-control-lg"
              placeholder="username address*"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <input
              required
              type="password"
              className="form-control form-control-lg"
              placeholder="Password (8+ characters)*"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>

          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label className="form-check-label small">
              I agree to Social Network’s <a href="#">Terms & Conditions</a> and
              acknowledge the <a href="#">Privacy Policy</a>.
            </label>
          </div>

          <button
            className="btn btn-primary btn-lg w-100 rounded-pill mb-3"
            disabled={loading || !username || !password || !agree}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <button
          type="button"
          className="btn btn-light w-100 rounded-pill border"
        >
          🔒 Log in with SSO
        </button>
      </div>
    </div>
  );
}
