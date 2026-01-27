import { useState } from "react";
import { apiAuth } from "../../api/api";
import { useAuth } from "../../auth/useAuth";
import { Link, useNavigate } from "react-router-dom";
// import { hashPassword } from "../../utils/hashPassword";
// import { USE_AUTH_BYPASS } from "../../config/env";
import "../AuthStyles/Auth.css";

export default function Register() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !username.trim() || !password.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");

    try {
      const response = await apiAuth.post("/auth/register", {
        username,
        name,
        password: password,
      });

      login(response.data.token);
      navigate("/posts");
    } catch {
      setError("No fue posible crear el usuario");
    }
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <div className="register-card shadow-sm">
        <h2 className="text-center fw-bold mb-3">Create account</h2>

        {error && (
          <div className="alert alert-danger py-2 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control form-control-lg"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control form-control-lg"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary btn-lg w-100"
            disabled={!name.trim() || !username.trim() || !password.trim()}
          >
            Create account
          </button>
        </form>

        <div className="text-center mt-3">
          <Link className="register-link" to="/">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
