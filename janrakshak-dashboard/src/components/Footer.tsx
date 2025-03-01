import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Janrakshak. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
