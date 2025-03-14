import { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia("(display-mode: standalone)").matches;

    if (isIos && isSafari && !isInStandaloneMode) {
      setShowPrompt(true);
    }
  }, []);

  if (!showPrompt) return null;

  return (
    <div style={{
      position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
      background: "rgba(0, 0, 0, 0.8)", color: "white", padding: "10px 15px",
      borderRadius: "10px", fontSize: "14px", zIndex: 1000
    }}>
      📲 Nhấn <strong>"Chia sẻ"</strong> rồi chọn <strong>"Thêm vào MH chính"</strong> để cài đặt ứng dụng!
    </div>
  );
};

export default InstallPrompt;
