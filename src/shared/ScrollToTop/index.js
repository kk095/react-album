import { useState, useEffect } from "react";
import "./styles.css";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 400) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);
  };

  const handleScrollToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  let mycls;
  if (!isVisible) {
    mycls = "scroltotop notscrol";
  } else {
    mycls = "notscrol";
  }
  return (
    <div
      className={mycls}
      onClick={handleScrollToTopClick}
      isVisible={isVisible}
    >
      /\
    </div>
  );
};
