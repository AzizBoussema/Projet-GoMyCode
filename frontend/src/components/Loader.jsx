import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <h2 className="loader-text">Savoryx</h2>
      </div>
    </div>
  );
};

export default Loader;
