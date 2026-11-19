import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert("Registered! Login now");
      navigate("/");
    } catch {
      alert("Register failed - Email already undi emo");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10 }}>
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <form onSubmit={handle} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input style={{ padding: 10 }} placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input style={{ padding: 10 }} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input style={{ padding: 10 }} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button style={{ padding: 10, background: "green", color: "white", border: "none", cursor: "pointer" }}>Register</button>
        <Link to="/" style={{ textAlign: "center" }}>Already have account? Login</Link>
      </form>
    </div>
  );
}