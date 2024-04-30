import React from "react";
import { strings } from "../utils/strings";

import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <h5>{strings.footer.name}</h5>
    </div>
  );
};
