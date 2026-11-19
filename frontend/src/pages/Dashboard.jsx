import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h1>Welcome {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <p style={{ color: "green" }}>Login Success ✅</p>
      <button onClick={handleLogout} style={{ padding: "10px 20px", background: "red", color: "white", border: "none", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
}