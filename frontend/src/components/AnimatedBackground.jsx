/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import "./animatedBackground.css";

const AnimatedBackground = () => {
  const { theme } = useTheme();

  // Parallax effect on scroll
  const { scrollY } = useScroll();
  // Move down the background slower than the user scrolls
  const y = useTransform(scrollY, [0, 1500], [0, 200]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      <motion.div
        className="premium-bg-image"
        style={{ y }}
      />
      {/* Overlay to ensure perfect text readability */}
      <div
        className={`premium-overlay ${theme === "dark" ? "overlay-dark" : "overlay-light"}`}
      ></div>
      {/* Noise texture for cinematic grain */}
      <div className="noise-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;
