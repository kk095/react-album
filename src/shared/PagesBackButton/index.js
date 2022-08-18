import "./styles.css";
import { useNavigate } from "react-router-dom";

export const PagesBackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="btncont" onClick={() => navigate(-1)}>
      Back
    </button>
  );
};
