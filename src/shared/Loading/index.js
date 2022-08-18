import "./styles.css";
import loadingImage from "./loading.png";

export const Loading = () => {
  return (
    <div className="container">
      <img class="loading" src={loadingImage} />
    </div>
  );
};
