import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">Vibewise 🔥</h1>
      <p className="landing-subtitle">
        Your mood, your people — join live chatrooms based on how you feel.
      </p>
      <button className="landing-button" onClick={() => navigate("/app")}>
        Enter App
      </button>
    </div>
  );
}

export default LandingPage;
