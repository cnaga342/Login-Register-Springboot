import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      alert("Login failed - Backend run avvatledu leda password thappu");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10 }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input style={{ padding: 10 }} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input style={{ padding: 10 }} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button style={{ padding: 10, background: "blue", color: "white", border: "none", cursor: "pointer" }} type="submit">Login</button>
        <Link to="/register" style={{ textAlign: "center" }}>No account? Register</Link>
      </form>
    </div>
  );
}