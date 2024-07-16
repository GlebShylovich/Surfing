import { useEffect } from "react";
import "./Popup.scss";

export default function Popup({ value, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup">
      {value > 0 ? "Successful!" : "Something went wrong!"}
    </div>
  );
}
