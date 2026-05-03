import { useTheme } from "../context/ThemeContext";
import "./animatedBackground.css";

const AnimatedBackground = () => {
  const { theme } = useTheme();

  return (
    <div className={`fixed inset-0 z-[-1] overflow-hidden pointer-events-none ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      {/* Background base fallback */}
      <div className="bg-base w-100 h-100 position-absolute"></div>
      
      {/* Food Background Image with Ken Burns effect */}
      <div className="premium-bg-image"></div>

      {/* Glassmorphism Overlays for Text Readability */}
      <div className={`premium-overlay ${theme === "dark" ? "overlay-dark" : "overlay-light"}`}></div>
      
      {/* Subtle Noise Texture for Cinematic Feel */}
      <div className="noise-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;
